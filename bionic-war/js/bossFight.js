/* ===== 仿生人1：战争 · BOSS战模块 ===== */
/* 林云（血肉之躯·真觉醒） vs K-047（金属体·受A先生控制）
 * 玩法：5轮攻防，闪避K-047攻击后反击，最终将α型神经组织注入K-047后颈。
 * 全局命名空间：window.BW
 * API：BW.BossFight.start(callback)  callback(success:boolean)
 */
window.BW = window.BW || {};

(function () {
  'use strict';

  /* ===== 攻击动作配置（每个攻击有2个有效闪避方向，任选其一） ===== */
  var ATTACKS = [
    { text: 'K-047侧身举枪，子弹向你右肩飞来——', keys: ['a', 's'] },
    { text: 'K-047抄起桌腿横扫你腰部——',         keys: ['w', 's'] },
    { text: 'K-047向你的方向冲来，左手掐向你的脖子——', keys: ['a', 'd'] },
    { text: 'K-047抬脚踹向你的腹部——',           keys: ['s', 'a'] },
    { text: 'K-047拔出匕首刺向你的胸口——',       keys: ['d', 'w'] }
  ];

  /* 闪避方向文字（W=前滚/低头 S=后撤 A=左闪 D=右闪） */
  var DODGE_LABEL = { 'w': '前滚/低头', 's': '后撤', 'a': '向左闪避', 'd': '向右闪避' };
  var DODGE_ARROW = { 'w': '↑',         's': '↓',   'a': '←',         'd': '→' };

  /* ===== 时间常量（毫秒） ===== */
  var T_ROUND_INTRO  = 1000; // 回合开始展示
  var T_ATTACK_WARN  = 1000; // 攻击描述 → 闪避提示间隔
  var T_DODGE_WINDOW = 2000; // 闪避反应时间
  var T_COUNTER_WIN  = 1500; // 反击反应时间
  var T_RESULT_PAUSE = 900;  // 单次结果展示后停顿
  var T_REVIVE_DELAY = 2000; // 死亡复活延迟
  var T_END_DELAY    = 2000; // 战斗结束 → 回调延迟

  /* ===== 运行时状态 ===== */
  var S = {
    playerHP: 3,
    enemyHP: 3,
    round: 0,
    callback: null,
    attackQueue: [],
    attackIndex: 0,
    allDodged: true
  };

  /* ===== DOM 引用 ===== */
  var D = {
    gameArea: null, container: null, infoBar: null,
    playerHpFill: null, enemyHpFill: null, roundLabel: null,
    arena: null, actionText: null, prompt: null, controls: null
  };

  /* ===== 事件处理器引用（用于精确移除，防止重复触发/内存泄漏） ===== */
  var L = { key: null, click: null, timer: null };

  function clearKey()   { if (L.key)   { document.removeEventListener('keydown', L.key);            L.key = null; } }
  function clearClick() { if (L.click && D.gameArea) { D.gameArea.removeEventListener('click', L.click); } L.click = null; }
  function clearTimer() { if (L.timer) { clearTimeout(L.timer); L.timer = null; } }
  function clearAll()   { clearKey(); clearClick(); clearTimer(); }

  /* ===== 工具：解析按键（兼容 e.key 与 e.code，仅认 WASD/E） ===== */
  function pressedKey(e) {
    var k = (e.key || '').toLowerCase();
    if (k === 'w' || k === 'a' || k === 's' || k === 'd' || k === 'e') return k;
    var c = e.code || '';
    if (c === 'KeyW') return 'w';
    if (c === 'KeyA') return 'a';
    if (c === 'KeyS') return 's';
    if (c === 'KeyD') return 'd';
    if (c === 'KeyE') return 'e';
    return null;
  }

  /* ===== UI 更新 ===== */
  function hpWidth(hp) {
    if (hp <= 0) return '0%';
    return (Math.round(hp / 3 * 1000) / 10) + '%'; // 3→100% 2→66.7% 1→33.3% 0→0%
  }
  function updateHP() {
    if (D.playerHpFill) D.playerHpFill.style.width = hpWidth(S.playerHP);
    if (D.enemyHpFill)  D.enemyHpFill.style.width  = hpWidth(S.enemyHP);
  }
  function updateRound() { if (D.roundLabel) D.roundLabel.textContent = '第' + S.round + '轮 / 共5轮'; }
  function setAction(html) { if (D.actionText) D.actionText.innerHTML = html; }
  function showPrompt(text, cls) {
    D.prompt.textContent = text;
    D.prompt.className = 'boss-prompt' + (cls ? ' ' + cls : '');
    D.prompt.style.display = 'flex';
  }
  function hidePrompt() { D.prompt.style.display = 'none'; D.prompt.textContent = ''; }
  function clearResult() {
    if (!D.arena) return;
    var rs = D.arena.querySelectorAll('.boss-result');
    for (var i = 0; i < rs.length; i++) rs[i].remove();
  }
  function showResult(text, cls) {
    setAction('');
    hidePrompt();
    var r = document.createElement('div');
    r.className = 'boss-result' + (cls ? ' ' + cls : '');
    r.textContent = text;
    D.arena.appendChild(r);
  }

  /* ===== 构建 UI ===== */
  function buildUI() {
    D.gameArea = document.getElementById('game-area');
    D.gameArea.innerHTML = '';

    D.container = document.createElement('div');
    D.container.className = 'boss-container';

    /* 顶部信息栏：林云HP / 回合 / K-047 HP */
    D.infoBar = document.createElement('div');
    D.infoBar.className = 'boss-info-bar';

    var pDisp = document.createElement('div'); pDisp.className = 'boss-hp-display';
    var pLabel = document.createElement('span'); pLabel.className = 'boss-hp-label player'; pLabel.textContent = '林云';
    var pBar = document.createElement('div'); pBar.className = 'hp-bar';
    D.playerHpFill = document.createElement('div'); D.playerHpFill.className = 'hp-fill player'; D.playerHpFill.style.width = '100%';
    pBar.appendChild(D.playerHpFill); pDisp.appendChild(pLabel); pDisp.appendChild(pBar);

    D.roundLabel = document.createElement('div'); D.roundLabel.className = 'boss-round'; D.roundLabel.textContent = '第1轮 / 共5轮';

    var eDisp = document.createElement('div'); eDisp.className = 'boss-hp-display';
    var eLabel = document.createElement('span'); eLabel.className = 'boss-hp-label enemy'; eLabel.textContent = 'K-047';
    var eBar = document.createElement('div'); eBar.className = 'hp-bar';
    D.enemyHpFill = document.createElement('div'); D.enemyHpFill.className = 'hp-fill enemy'; D.enemyHpFill.style.width = '100%';
    eBar.appendChild(D.enemyHpFill); eDisp.appendChild(eLabel); eDisp.appendChild(eBar);

    D.infoBar.appendChild(pDisp); D.infoBar.appendChild(D.roundLabel); D.infoBar.appendChild(eDisp);

    /* 战斗区域 */
    D.arena = document.createElement('div'); D.arena.className = 'boss-arena';
    D.actionText = document.createElement('div'); D.actionText.className = 'boss-action-text';
    D.prompt = document.createElement('div'); D.prompt.className = 'boss-prompt'; D.prompt.style.display = 'none';
    D.arena.appendChild(D.actionText); D.arena.appendChild(D.prompt);

    /* 操作说明 */
    D.controls = document.createElement('div'); D.controls.className = 'boss-controls';
    D.controls.innerHTML =
      '<div style="display:flex;gap:12px;">' +
      '<div class="boss-key-hint"><span class="key">W</span><span class="key">A</span><span class="key">S</span><span class="key">D</span> 闪避方向</div>' +
      '<div class="boss-key-hint"><span class="key">鼠标左键</span> 攻击</div>' +
      '<div class="boss-key-hint"><span class="key">E</span> 注入（最终轮）</div>'+
      '</div>';

    D.container.appendChild(D.infoBar); D.container.appendChild(D.arena); D.container.appendChild(D.controls);

    /* 跳过对战按钮 — 放到操作说明栏右侧 */
    var skipBtn = document.createElement('button');
    skipBtn.className = 'btn-skip-battle';
    skipBtn.textContent = '跳过对战';
    skipBtn.title = '直接获胜';
    skipBtn.style.flexShrink = '0';
    skipBtn.onclick = function () { endBattle(true); };
    D.controls.appendChild(skipBtn);

    D.gameArea.appendChild(D.container);
  }

  /* ===== 生成本轮攻击队列 ===== */
  function genQueue() {
    var count = (S.round === 5) ? 1 : (2 + Math.floor(Math.random() * 2)); // 第5轮1次，其余2-3次
    var q = [];
    for (var i = 0; i < count; i++) q.push(ATTACKS[Math.floor(Math.random() * ATTACKS.length)]);
    return q;
  }

  /* ===== 回合控制 ===== */
  function startRound() { clearAll(); clearResult(); S.round++; prepareRound(); }

  function prepareRound() {
    if (S.round === 5) S.enemyHP = 1; // 第5轮：K-047 HP为1
    updateHP(); updateRound();
    S.attackIndex = 0; S.allDodged = true;
    S.attackQueue = genQueue();
    setAction('第' + S.round + '轮 / 共5轮');
    hidePrompt();
    L.timer = setTimeout(function () { performAttack(); }, T_ROUND_INTRO);
  }

  function revive() {
    clearAll();
    S.playerHP = 1; // 失败复活，HP恢复为1
    updateHP();
    setAction('林云咬牙站起——重试本轮！');
    L.timer = setTimeout(function () { prepareRound(); }, T_ROUND_INTRO);
  }

  function nextRound() {
    clearAll();
    if (S.round >= 5) { endBattle(true); return; }
    startRound();
  }

  /* ===== 单次攻击流程 ===== */
  function performAttack() {
    clearAll(); clearResult();

    if (S.attackIndex >= S.attackQueue.length) { onAttacksDone(); return; }

    var atk = S.attackQueue[S.attackIndex];
    setAction('<span class="warning">' + atk.text + '</span>');
    hidePrompt();

    L.timer = setTimeout(function () { showDodgePrompt(atk); }, T_ATTACK_WARN);
  }

  function showDodgePrompt(atk) {
    clearTimer();
    // 随机选一个有效方向作为提示（实际两个方向都接受）
    var pk = atk.keys[Math.floor(Math.random() * atk.keys.length)];
    showPrompt(DODGE_ARROW[pk] + ' ' + DODGE_LABEL[pk] + '！按 ' + pk.toUpperCase(), 'dodge');

    L.key = function (e) {
      var k = pressedKey(e);
      if (!k || k === 'e') return; // 闪避阶段只接受 WASD
      e.preventDefault();
      if (atk.keys.indexOf(k) !== -1) dodgeSuccess();
      else hit();
    };
    document.addEventListener('keydown', L.key);

    L.timer = setTimeout(function () { hit(); }, T_DODGE_WINDOW); // 超时即被击中
  }

  function dodgeSuccess() {
    if (!L.key) return; // 防止重复触发
    clearKey(); clearTimer();
    hidePrompt();
    setAction('闪避成功！');
    S.attackIndex++;
    L.timer = setTimeout(function () { performAttack(); }, T_RESULT_PAUSE);
  }

  function hit() {
    if (!L.key) return; // 防止重复触发
    clearKey(); clearTimer();
    hidePrompt();
    S.playerHP--;
    S.allDodged = false;
    updateHP();
    setAction('<span class="warning">被击中！</span>');

    if (S.playerHP <= 0) {
      // HP归零：2秒后复活重试本轮
      L.timer = setTimeout(function () { revive(); }, T_REVIVE_DELAY);
    } else {
      S.attackIndex++;
      L.timer = setTimeout(function () { performAttack(); }, T_RESULT_PAUSE);
    }
  }

  /* ===== 本轮攻击结束处理 ===== */
  function onAttacksDone() {
    clearAll();
    if (S.round === 5) {
      if (S.allDodged) {
        injectionPhase();
      } else {
        // 第5轮闪避失败：重试本次闪避
        S.attackIndex = 0; S.allDodged = true;
        setAction('再次寻找破绽——');
        L.timer = setTimeout(function () { performAttack(); }, T_RESULT_PAUSE);
      }
    } else {
      if (S.allDodged) {
        counterPhase();
      } else {
        setAction('本轮未能全部闪避，进入下一轮。');
        L.timer = setTimeout(function () { nextRound(); }, T_RESULT_PAUSE);
      }
    }
  }

  /* ===== 反击阶段（第1-4轮全部闪避后） ===== */
  function counterPhase() {
    clearAll();
    setAction('K-047动作出现破绽——反击！');
    showPrompt('攻击！', 'attack');

    L.click = function (e) {
      if (e.button !== 0) return; // 仅左键
      counterSuccess();
    };
    D.gameArea.addEventListener('click', L.click);

    L.timer = setTimeout(function () { counterMiss(); }, T_COUNTER_WIN);
  }

  function counterSuccess() {
    if (!L.click) return;
    clearClick(); clearTimer();
    hidePrompt();
    if (S.enemyHP > 1) S.enemyHP--; // 第5轮前不低于1，注入才是终结
    updateHP();
    setAction('反击成功！');
    L.timer = setTimeout(function () { nextRound(); }, T_RESULT_PAUSE);
  }

  function counterMiss() {
    if (!L.click) return;
    clearClick(); clearTimer();
    hidePrompt();
    setAction('错过攻击机会！');
    L.timer = setTimeout(function () { nextRound(); }, T_RESULT_PAUSE);
  }

  /* ===== 注入阶段（第5轮闪避成功后） ===== */
  function injectionPhase() {
    clearAll();
    setAction('林云绕到K-047身后，后颈接口暴露在前——');
    L.timer = setTimeout(function () {
      showPrompt('按E注入！', 'inject');
      L.key = function (e) {
        var k = pressedKey(e);
        if (k !== 'e') return; // 仅接受 E
        e.preventDefault();
        injectionSuccess();
      };
      document.addEventListener('keydown', L.key);
    }, T_ATTACK_WARN);
  }

  function injectionSuccess() {
    if (!L.key) return;
    clearKey(); clearTimer();
    hidePrompt();
    S.enemyHP = 0;
    updateHP();
    showResult('注入成功。K-047倒地。', 'success');
    L.timer = setTimeout(function () { endBattle(true); }, T_END_DELAY);
  }

  /* ===== 战斗结束，清理所有监听 ===== */
  function endBattle(success) {
    clearAll();
    var cb = S.callback;
    S.callback = null;
    if (cb) cb(success);
  }

  /* ===== 公开 API ===== */
  BW.BossFight = {
    start: function (callback) {
      D.gameArea = document.getElementById('game-area');
      clearAll(); // 清理上一次可能残留的监听
      S.playerHP = 3;
      S.enemyHP = 3;
      S.round = 0;
      S.attackIndex = 0;
      S.allDodged = true;
      S.callback = callback;
      buildUI();
      startRound();
    }
  };
})();
