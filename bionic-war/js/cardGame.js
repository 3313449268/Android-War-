/* ===== 仿生人1：战争 · 益智卡牌对弈 ===== */
/* 纯原生 JS，命名空间 window.BW */
window.BW = window.BW || {};

BW.CardGame = (function () {
  'use strict';

  /* ---------- 常量 ---------- */
  var MAX_HP = 15;
  var MAX_HAND = 7;
  var INITIAL_HAND = 5;

  var TYPES = {
    attack:  { key:'attack',  icon:'⚔️', label:'攻击', cls:'red' },
    defense: { key:'defense', icon:'🛡️', label:'防御', cls:'blue' },
    counter: { key:'counter', icon:'↩️', label:'反击', cls:'counter' },
    charge:  { key:'charge',  icon:'🔥', label:'蓄力', cls:'charge' },
    heal:    { key:'heal',    icon:'✚', label:'回血', cls:'heal' }
  };

  /* ---------- 状态 ---------- */
  var S = null;
  var timers = [];

  function clearTimers() {
    timers.forEach(function (id) { clearTimeout(id); });
    timers = [];
  }
  function later(fn, ms) {
    var id = setTimeout(fn, ms);
    timers.push(id);
    return id;
  }

  function newState(opponent, callback) {
    clearTimers();
    S = {
      opponent: opponent || '对手',
      callback: callback,
      playerHand: [],
      enemyHand: [],
      playerHP: MAX_HP,
      enemyHP: MAX_HP,
      round: 1,
      playerPlayed: null,
      enemyPlayed: null,
      enemyRevealed: false,
      playerCharged: false,
      enemyCharged: false,
      busy: false,
      ended: false
    };
    for (var i = 0; i < INITIAL_HAND; i++) {
      drawCard(S.playerHand);
      drawCard(S.enemyHand);
    }
  }

  /* ---------- 无限摸牌（概率分布） ---------- */
  /* 攻击+防御=50%（各25%） 反击=20% 蓄力=20% 回血=10% */
  function randomCard() {
    var r = Math.random();
    if (r < 0.50) {
      return { type:'attack', value: 1 + Math.floor(Math.random() * 5) };
    } else if (r < 0.70) {
      return { type:'defense', value: 1 + Math.floor(Math.random() * 5) };
    } else if (r < 0.80) {
      return { type:'counter', value:0 };
    } else if (r < 0.90) {
      return { type:'charge', value:0 };
    } else {
      var heals = [2, 4,6];
      return { type:'heal', value: heals[Math.floor(Math.random() * 3)] };
    }
  }

  function drawCard(hand) {
    if (hand.length >= MAX_HAND) return null;
    hand.push(randomCard());
    return hand[hand.length - 1];
  }

  /* ---------- DOM ---------- */
  var D = {};
  function buildUI() {
    var root = document.getElementById('game-area');
    root.innerHTML =
      '<div class="cardgame-container" style="position:relative">' +
        '<div class="cardgame-info">' +
          '<div class="cardgame-hp">' +
            '<span style="font-size:13px">你 HP: <span id="cg-php-text">' + MAX_HP + '/' + MAX_HP + '</span></span>' +
            '<div class="hp-bar"><div class="hp-fill player" id="cg-php-fill" style="width:100%"></div></div>' +
          '</div>' +
          '<div class="cardgame-round" id="cg-round">第 1 回合</div>' +
          '<div class="cardgame-hp">' +
            '<span style="font-size:13px"><span id="cg-ename">对手</span> HP: <span id="cg-ehp-text">' + MAX_HP + '/' + MAX_HP + '</span></span>' +
            '<div class="hp-bar"><div class="hp-fill enemy" id="cg-ehp-fill" style="width:100%"></div></div>' +
          '</div>' +
        '</div>' +
        '<div id="cg-status" style="display:flex;justify-content:space-between;padding:0 16px 4px;font-size:12px;font-family:var(--font-mono)"></div>' +
        '<div style="display:flex;justify-content:flex-end;padding:0 16px 4px">' +
          '<button id="cg-skip" class="btn-skip-battle" title="直接获胜">跳过对战</button>' +
        '</div>' +
        '<div class="cardgame-arena">' +
          '<div>' +
            '<div class="field-label">对方出牌区</div>' +
            '<div class="enemy-field" id="cg-enemy-field"></div>' +
          '</div>' +
          '<div>' +
            '<div class="field-label">己方出牌区</div>' +
            '<div class="player-field" id="cg-player-field"></div>' +
          '</div>' +
        '</div>' +
        '<div class="cardgame-log" id="cg-log">对弈开始</div>' +
        '<div style="display:flex;align-items:center;gap:12px">' +
          '<div class="player-hand" id="cg-hand" style="flex:1"></div>' +
        '</div>' +
        '<div class="cardgame-result" id="cg-result" style="display:none;position:absolute;inset:0;' +
          'background:rgba(6,8,13,0.88);align-items:center;justify-content:center;flex-direction:column;z-index:10"></div>' +
      '</div>';

    D.phpText = document.getElementById('cg-php-text');
    D.phpFill = document.getElementById('cg-php-fill');
    D.ehpText = document.getElementById('cg-ehp-text');
    D.ehpFill = document.getElementById('cg-ehp-fill');
    D.round = document.getElementById('cg-round');
    D.ename = document.getElementById('cg-ename');
    D.enemyField = document.getElementById('cg-enemy-field');
    D.playerField = document.getElementById('cg-player-field');
    D.log = document.getElementById('cg-log');
    D.hand = document.getElementById('cg-hand');
    D.result = document.getElementById('cg-result');
    D.status = document.getElementById('cg-status');
    D.skip = document.getElementById('cg-skip');
    D.skip.onclick = function () { skipBattle(); };
  }

  /* ---------- 渲染 ---------- */
  function renderInfo() {
    D.phpText.textContent = S.playerHP + '/' + MAX_HP;
    D.phpFill.style.width = (S.playerHP / MAX_HP * 100) + '%';
    D.ehpText.textContent = S.enemyHP + '/' + MAX_HP;
    D.ehpFill.style.width = (S.enemyHP / MAX_HP * 100) + '%';
    D.round.textContent = '第 ' + S.round + ' 回合';
    D.ename.textContent = S.opponent;
    var html = '';
    html += '<span style="color:' + (S.playerCharged ? 'var(--accent-warm)' : 'transparent') + '">' +
      (S.playerCharged ? '⚡蓄力中(伤害×2)' : '.') + '</span>';
    html += '<span style="color:' + (S.enemyCharged ? 'var(--accent-warm)' : 'transparent') + '">' +
      (S.enemyCharged ? '对方蓄力中' : '.') + '</span>';
    D.status.innerHTML = html;
  }

  function fieldCardHTML(card, revealed) {
    if (!card) return '<div class="card-slot">待出牌</div>';
    if (!revealed) {
      return '<div class="played-card" style="background:var(--bg-deep);border:1px solid var(--border);color:var(--text-secondary)">' +
        '<div class="card-type">背面</div><div class="card-value">?</div></div>';
    }
    var t = TYPES[card.type];
    var valDisplay = card.value > 0 ? card.value : '—';
    return '<div class="played-card ' + t.cls + '">' +
      '<div class="card-type">' + t.label + '</div>' +
      '<div class="card-value">' + valDisplay + '</div></div>';
  }

  function renderFields() {
    D.enemyField.innerHTML = fieldCardHTML(S.enemyPlayed, S.enemyRevealed);
    D.playerField.innerHTML = fieldCardHTML(S.playerPlayed, true);
  }

  function renderHand() {
    D.hand.innerHTML = '';
    D.hand.style.display = '';
    if (S.playerHand.length === 0) {
      D.hand.innerHTML = '<div style="color:var(--text-secondary);font-size:13px;font-family:var(--font-mono)">无手牌</div>';
      return;
    }
    S.playerHand.forEach(function (card, idx) {
      var t = TYPES[card.type];
      var div = document.createElement('div');
      div.className = 'hand-card ' + t.cls + (S.busy ? ' disabled' : '');
      var valDisplay = card.value > 0 ? card.value : '—';
      div.innerHTML =
        '<div class="card-icon">' + t.icon + '</div>' +
        '<div class="card-label">' + t.label + '</div>' +
        '<div class="card-num">' + valDisplay + '</div>';
      if (!S.busy) {
        (function (i) { div.onclick = function () { onPlayerPlay(i); }; })(idx);
      }
      D.hand.appendChild(div);
    });
  }

  function logMsg(msg) {
    D.log.textContent = msg;
  }

  /* ---------- AI ---------- */
  function pickByType(hand, type) {
    var arr = [];
    for (var i = 0; i < hand.length; i++) if (hand[i].type === type) arr.push(hand[i]);
    return arr;
  }
  function randPick(arr) {
    return arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
  }
  function highest(arr) {
    if (!arr.length) return null;
    arr.sort(function (a, b) { return b.value - a.value; });
    return arr[0];
  }

  function enemyChoose() {
    var hand = S.enemyHand;
    if (hand.length === 0) return null;

    // 蓄力中 → 优先出高攻
    if (S.enemyCharged) {
      var atk = pickByType(hand, 'attack');
      if (atk.length) return highest(atk);
    }

    if (S.opponent === 'A先生') {
      // 低血 → 回血/防御
      if (S.enemyHP <= 5) {
        var heals = pickByType(hand, 'heal');
        if (heals.length) return highest(heals);
        var defs = pickByType(hand, 'defense');
        if (defs.length && Math.random() < 0.6) return highest(defs);
      }
      // 玩家蓄力 → 可能反击
      if (S.playerCharged && Math.random() < 0.65) {
        var counters = pickByType(hand, 'counter');
        if (counters.length) return randPick(counters);
      }
      // 前几回合 → 偶尔蓄力
      if (S.round <= 3 && Math.random() < 0.25) {
        var charges = pickByType(hand, 'charge');
        if (charges.length) return randPick(charges);
      }
      // 优先进攻
      var attacks = pickByType(hand, 'attack');
      if (attacks.length && Math.random() < 0.6) {
        attacks.sort(function (a, b) { return b.value - a.value; });
        return attacks[Math.floor(Math.random() * Math.min(2, attacks.length))];
      }
      // 偶尔反击
      var ct = pickByType(hand, 'counter');
      if (ct.length && Math.random() < 0.3) return randPick(ct);
    } else {
      // 其他对手：偏激进
      var atk2 = pickByType(hand, 'attack');
      if (atk2.length && Math.random() < 0.65) return randPick(atk2);
      var defs2 = pickByType(hand, 'defense');
      if (defs2.length && Math.random() < 0.3) return randPick(defs2);
    }

    return randPick(hand);
  }

  /* ---------- 结算 ---------- */
  function resolve() {
    var p = S.playerPlayed, e = S.enemyPlayed;
    S.enemyRevealed = true;
    renderFields();

    var logs = [];
    var dmgToPlayer = 0;
    var dmgToEnemy = 0;
    var playerHeal = 0;
    var enemyHeal = 0;

    // 蓄力倍率（本回合生效，结算后消耗）
    var pMul = S.playerCharged ? 2 : 1;
    var eMul = S.enemyCharged ? 2 : 1;

    // --- 回血卡（先结算回血，再结算战斗） ---
    if (p && p.type === 'heal') {
      playerHeal = p.value;
      logs.push('你回血' + p.value);
    }
    if (e && e.type === 'heal') {
      enemyHeal = e.value;
      logs.push(S.opponent + '回血' + e.value);
    }

    // --- 蓄力卡（仅记录日志，实际flag在结算末尾设置） ---
    if (p && p.type === 'charge') {
      logs.push('你蓄力，下回合伤害×2');
    }
    if (e && e.type === 'charge') {
      logs.push(S.opponent + '蓄力，下回合伤害×2');
    }

    // --- 战斗结算（蓄力倍率先乘到攻击值上，再比较） ---
    if (p && p.type === 'attack' && e && e.type === 'attack') {
      var pAtk = p.value * pMul;
      var eAtk = e.value * eMul;
      if (pAtk > eAtk) {
        dmgToEnemy = pAtk - eAtk;
        logs.push('攻击对冲 ' + p.value + (pMul>1?'×2='+pAtk:'') + 'vs' + e.value + (eMul>1?'×2='+eAtk:'') + '，你造成' + dmgToEnemy + '伤害');
      } else if (eAtk > pAtk) {
        dmgToPlayer = eAtk - pAtk;
        logs.push('攻击对冲 ' + p.value + (pMul>1?'×2='+pAtk:'') + 'vs' + e.value + (eMul>1?'×2='+eAtk:'') + '，对方造成' + dmgToPlayer + '伤害');
      } else {
        logs.push('攻击对冲，数值相同，平局');
      }
    } else if (p && p.type === 'attack' && e && e.type === 'defense') {
      var pAtk2 = p.value * pMul;
      if (pAtk2 > e.value) {
        dmgToEnemy = pAtk2 - e.value;
        logs.push('攻击破防 ' + p.value + (pMul>1?'×2='+pAtk2:'') + 'vs' + e.value + '，造成' + dmgToEnemy + '伤害');
      } else {
        logs.push('攻击未破防 ' + p.value + (pMul>1?'×2='+pAtk2:'') + 'vs' + e.value + '，无伤害');
      }
    } else if (p && p.type === 'defense' && e && e.type === 'attack') {
      var eAtk2 = e.value * eMul;
      if (eAtk2 > p.value) {
        dmgToPlayer = eAtk2 - p.value;
        logs.push('防御被破 ' + p.value + 'vs' + e.value + (eMul>1?'×2='+eAtk2:'') + '，受到' + dmgToPlayer + '伤害');
      } else {
        logs.push('成功防御 ' + p.value + 'vs' + e.value + (eMul>1?'×2='+eAtk2:'') + '，无伤害');
      }
    } else if (p && p.type === 'attack' && e && e.type === 'counter') {
      // 反击反弹的是攻击方蓄力后的攻击值的一半
      var reflect = Math.floor(p.value * pMul / 2);
      dmgToPlayer = reflect;
      logs.push('对方反击！攻击被抵消，反弹' + reflect + '伤害');
    } else if (p && p.type === 'counter' && e && e.type === 'attack') {
      var reflect2 = Math.floor(e.value * eMul / 2);
      dmgToEnemy = reflect2;
      logs.push('反击成功！抵消对方攻击，反弹' + reflect2 + '伤害');
    } else if (p && p.type === 'attack' && e && (e.type === 'charge' || e.type === 'heal')) {
      dmgToEnemy = p.value * pMul;
      logs.push('对方出' + TYPES[e.type].label + '无防御，你造成' + dmgToEnemy + '伤害');
    } else if (e && e.type === 'attack' && p && (p.type === 'charge' || p.type === 'heal')) {
      dmgToPlayer = e.value * eMul;
      logs.push('你出' + TYPES[p.type].label + '无防御，受到' + dmgToPlayer + '伤害');
    } else if (p && p.type === 'defense' && e && e.type === 'defense') {
      logs.push('双方防御，互不伤害');
    } else if (p && p.type === 'attack' && !e) {
      dmgToEnemy = p.value * pMul;
      logs.push('对方无牌，你造成' + dmgToEnemy + '伤害');
    } else if (e && e.type === 'attack' && !p) {
      dmgToPlayer = e.value * eMul;
      logs.push('你无牌，受到' + dmgToPlayer + '伤害');
    } else if (p && !e) {
      logs.push('对方无牌可出');
    } else if (e && !p) {
      logs.push('你无牌可出');
    } else {
      logs.push('双方均无直接伤害');
    }

    // 应用伤害
    if (dmgToEnemy > 0) S.enemyHP = Math.max(0, S.enemyHP - dmgToEnemy);
    if (dmgToPlayer > 0) S.playerHP = Math.max(0, S.playerHP - dmgToPlayer);
    // 应用回血
    if (playerHeal > 0) S.playerHP = Math.min(MAX_HP, S.playerHP + playerHeal);
    if (enemyHeal > 0) S.enemyHP = Math.min(MAX_HP, S.enemyHP + enemyHeal);

    // 更新蓄力状态：本回合出的蓄力卡 → 下回合生效
    S.playerCharged = !!(p && p.type === 'charge');
    S.enemyCharged = !!(e && e.type === 'charge');

    logMsg(logs.join('  '));
    renderInfo();
    renderHand();

    if (S.playerHP <= 0 || S.enemyHP <= 0) {
      endGame();
      return;
    }

    later(function () {
      S.playerPlayed = null;
      S.enemyPlayed = null;
      S.enemyRevealed = false;
      S.round++;
      drawCard(S.playerHand);
      drawCard(S.enemyHand);
      S.busy = false;
      renderInfo();
      renderFields();
      renderHand();
      startRound();
    }, 2500);
  }

  /* ---------- 回合流程 ---------- */
  function startRound() {
    if (S.ended) return;

    renderFields();

    if (S.playerHand.length === 0) {
      S.busy = true;
      S.playerPlayed = null;
      renderHand();
      logMsg('第' + S.round + '回合 · 你无牌可出，自动跳过');
      later(enemyTurn, 1000);
    } else {
      S.busy = false;
      renderHand();
      var hint = S.playerCharged ? '（⚡蓄力中：伤害×2）' : '';
      logMsg('第' + S.round + '回合 · 请选择一张手牌' + hint);
    }
  }

  function onPlayerPlay(idx) {
    if (S.busy || S.ended) return;
    var card = S.playerHand[idx];
    if (!card) return;
    S.busy = true;
    S.playerHand.splice(idx, 1);
    S.playerPlayed = card;
    renderHand();
    renderFields();
    var t = TYPES[card.type];
    var valStr = card.value > 0 ? ' ' + card.value : '';
    logMsg('你打出 ' + t.label + valStr);
    later(enemyTurn, 1000);
  }

  function enemyTurn() {
    if (S.ended) return;
    var ec = enemyChoose();
    S.enemyPlayed = ec;
    S.enemyRevealed = false;
    if (ec) {
      var i = S.enemyHand.indexOf(ec);
      if (i >= 0) S.enemyHand.splice(i, 1);
    }
    renderFields();
    logMsg(ec ? (S.opponent + ' 已出牌') : (S.opponent + ' 无牌可出'));
    later(resolve, 1000);
  }

  /* ---------- 跳过对战 ---------- */
  function skipBattle() {
    if (S.ended) return;
    S.ended = true;
    S.busy = true;
    clearTimers();
    var cb = S.callback;
    D.result.style.display = 'flex';
    D.result.className = 'cardgame-result win';
    D.result.innerHTML =
      '<div style="font-size:44px;font-weight:bold;letter-spacing:8px">跳过</div>' +
      '<div style="margin-top:14px;font-size:13px;color:var(--text-secondary);font-family:var(--font-mono)">直接通过</div>';
    D.hand.style.display = 'none';
    D.skip.style.display = 'none';
    later(function () {
      if (typeof cb === 'function') cb(true);
    }, 1500);
  }

  /* ---------- 结束 ---------- */
  function endGame() {
    if (S.ended) return;
    S.ended = true;
    S.busy = true;
    clearTimers();

    var success;
    if (S.enemyHP <= 0 && S.playerHP > 0) success = true;
    else if (S.playerHP <= 0) success = false;
    else success = S.playerHP >= S.enemyHP;

    D.skip.style.display = 'none';
    D.result.style.display = 'flex';
    D.result.className = 'cardgame-result ' + (success ? 'win' : 'lose');
    D.hand.style.display = 'none';

    if (success) {
      D.result.innerHTML =
        '<div style="font-size:44px;font-weight:bold;letter-spacing:8px">胜利</div>' +
        '<div style="margin-top:14px;font-size:13px;color:var(--text-secondary);font-family:var(--font-mono)">你赢得了对弈</div>';
      var cb = S.callback;
      later(function () {
        if (typeof cb === 'function') cb(true);
      }, 2000);
    } else {
      // 输掉 → 显示重新挑战按钮
      var opp = S.opponent;
      var cb2 = S.callback;
      D.result.innerHTML =
        '<div style="font-size:44px;font-weight:bold;letter-spacing:8px">失败</div>' +
        '<div style="margin-top:14px;font-size:13px;color:var(--text-secondary);font-family:var(--font-mono)">你输掉了对弈</div>' +
        '<button id="cg-retry" class="btn-retry" style="margin-top:22px">重新挑战</button>';
      document.getElementById('cg-retry').onclick = function () {
        D.result.style.display = 'none';
        start(opp, cb2);
      };
    }
  }

  /* ---------- 入口 ---------- */
  function start(opponent, callback) {
    newState(opponent, callback);
    buildUI();
    renderInfo();
    renderFields();
    renderHand();
    logMsg('对弈开始！对手：' + (opponent || '对手'));
    startRound();
  }

  return { start: start };
})();
