/* ===== 变色龙解密小游戏 ===== */
/* 全局命名空间挂载：BW.Chameleon.start(level, callback) */
window.BW = window.BW || {};

BW.Chameleon = (function () {
  var LEVEL_COUNT = 3;

  var LEVEL_TITLE = {
    1: '关卡 1 / 3 · 守卫队长',
    2: '关卡 2 / 3 · 首席研究员',
    3: '关卡 3 / 3 · 监控中心主任霍恩'
  };

  var FONT_MONO = "'Courier New', 'Consolas', monospace";
  var C_ACCENT = '#00d4ff';
  var C_DANGER = '#ff3850';
  var C_SUCCESS = '#2ecc71';
  var C_WARN = '#ff8c42';
  var C_TEXT = '#d4dce4';
  var C_TEXT_DIM = '#6a7480';

  var state = {
    callback: null,
    timer: null,
    finished: false
  };

  /* ----- 工具：创建元素 ----- */
  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  /* ----- 获取并清空容器 ----- */
  function getContainer() {
    var c = document.getElementById('game-area');
    c.innerHTML = '';
    return c;
  }

  /* ----- 顶部信息栏 + 进度点 ----- */
  function buildHeader(level) {
    var header = el('div', 'chameleon-header');
    header.appendChild(el('div', 'chameleon-level', LEVEL_TITLE[level]));
    var prog = el('div', 'chameleon-progress');
    for (var i = 1; i <= LEVEL_COUNT; i++) {
      var dot = el('span', 'progress-dot');
      if (i < level) dot.classList.add('done');
      else if (i === level) dot.classList.add('active');
      prog.appendChild(dot);
    }
    header.appendChild(prog);
    return header;
  }

  /* ----- 根容器（终端风格） ----- */
  function buildRoot(level) {
    var root = el('div', 'chameleon-container fade-in');
    root.style.fontFamily = FONT_MONO;
    root.appendChild(buildHeader(level));
    return root;
  }

  /* ----- 日志写入 ----- */
  function setLog(logEl, text, type) {
    logEl.style.whiteSpace = 'pre-wrap';
    logEl.textContent = text;
    logEl.style.color = type === 'success' ? C_SUCCESS :
                        type === 'danger' ? C_DANGER :
                        type === 'warn' ? C_WARN :
                        C_TEXT_DIM;
  }

  /* ----- 结束：2 秒后回调 ----- */
  function finish(success) {
    if (state.finished) return;
    state.finished = true;
    if (state.timer) { clearInterval(state.timer); state.timer = null; }
    var cb = state.callback;
    setTimeout(function () {
      if (typeof cb === 'function') cb(success);
    }, 2000);
  }

  /* =====================================================
   * 关卡 1 · 守卫队长
   * 收集 3 件生物特征样本 → 执行变身
   * ===================================================== */
  function renderLevel1() {
    var items = [
      { icon: '📷', name: '守卫队长·半张照片' },
      { icon: '🎤', name: '守卫队长·声纹录音' },
      { icon: '✂️', name: '守卫队长·带毛囊头发' }
    ];
    var collected = [false, false, false];

    var root = buildRoot(1);
    root.appendChild(el('div', 'chameleon-target',
      '<strong>目标：</strong>变成守卫队长，通过虹膜 + 声纹 + 心跳三重验证。<br>' +
      '点击收集三件生物特征样本，集齐后执行变身。'));

    var itemsWrap = el('div', 'chameleon-items');
    var logEl = el('div', 'chameleon-log', '> 等待采集生物特征样本...');

    items.forEach(function (it, i) {
      var card = el('div', 'collect-item',
        '<div class="item-icon">' + it.icon + '</div>' +
        '<div class="item-name">' + it.name + '</div>');
      card.onclick = function () {
        if (state.finished || collected[i]) return;
        collected[i] = true;
        card.classList.add('collected');
        setLog(logEl, '> 已采集：' + it.name);
        if (collected[0] && collected[1] && collected[2]) {
          actionBtn.classList.remove('disabled');
          setLog(logEl, '> 三重样本集齐，可以执行变身。', 'warn');
        }
      };
      itemsWrap.appendChild(card);
    });
    root.appendChild(itemsWrap);

    var actionBtn = el('button', 'chameleon-action disabled', '执行变身');
    root.appendChild(actionBtn);
    root.appendChild(logEl);

    actionBtn.onclick = function () {
      if (state.finished || actionBtn.classList.contains('disabled')) return;
      actionBtn.classList.add('disabled');
      setLog(logEl,
        '> 虹膜、声纹、心跳三重验证通过。\n' +
        '> 变色龙体已完美复制守卫队长的生物特征。\n' +
        '> 身份切换完成。', 'success');
      finish(true);
    };

    getContainer().appendChild(root);
  }

  /* =====================================================
   * 关卡 2 · 首席研究员
   * 15 秒时间窗口内点击「化装成助理」
   * ===================================================== */
  function renderLevel2() {
    var TOTAL = 15;
    var remaining = TOTAL;

    var root = buildRoot(2);
    root.appendChild(el('div', 'chameleon-target',
      '<strong>目标：</strong>首席研究员装有心脏起搏器，变色龙无法复制金属结构。<br>' +
      '情报：首席研究员每周三下午 3 点做核磁共振，需临时取出起搏器，存在 15 分钟窗口期。<br>' +
      '趁此时机化装成助理获取生物数据。'));

    /* 倒计时显示 */
    var timerBox = el('div', 'chameleon-target');
    timerBox.style.textAlign = 'center';
    var timerLabel = el('div', null, '窗口期倒计时');
    timerLabel.style.cssText = 'font-size:13px;color:' + C_TEXT_DIM + ';letter-spacing:2px;';
    var timerNum = el('div', null, String(remaining));
    timerNum.style.cssText = 'font-size:44px;color:' + C_ACCENT + ';font-weight:bold;line-height:1.2;';
    timerBox.appendChild(timerLabel);
    timerBox.appendChild(timerNum);
    root.appendChild(timerBox);

    var actionBtn = el('button', 'chameleon-action', '化装成助理');
    root.appendChild(actionBtn);

    var logEl = el('div', 'chameleon-log', '> 等待行动时机...倒计时归零前必须完成化装。');
    root.appendChild(logEl);

    function startTimer() {
      if (state.timer) clearInterval(state.timer);
      state.timer = setInterval(function () {
        remaining--;
        if (remaining <= 5) timerNum.style.color = C_DANGER;
        timerNum.textContent = remaining > 0 ? remaining : 0;
        if (remaining <= 0) {
          clearInterval(state.timer);
          state.timer = null;
          actionBtn.classList.add('disabled');
          setLog(logEl, '> 窗口期已结束，行动失败。重新等待下一次核磁共振时机...', 'danger');
          setTimeout(function () {
            if (state.finished) return;
            remaining = TOTAL;
            timerNum.style.color = C_ACCENT;
            timerNum.textContent = remaining;
            actionBtn.classList.remove('disabled');
            setLog(logEl, '> 新的窗口期开启，倒计时重启。');
            startTimer();
          }, 1500);
        }
      }, 1000);
    }

    actionBtn.onclick = function () {
      if (state.finished || actionBtn.classList.contains('disabled')) return;
      if (remaining > 0) {
        clearInterval(state.timer);
        state.timer = null;
        actionBtn.classList.add('disabled');
        setLog(logEl,
          '> 助理身份确认，核磁共振室门禁已通过。\n' +
          '> 变色龙体正在扫描首席研究员生物数据，起搏器金属结构已规避。\n' +
          '> 数据采集完成。', 'success');
        finish(true);
      }
    };

    getContainer().appendChild(root);
    startTimer();
  }

  /* =====================================================
   * 关卡 3 · 监控中心主任霍恩
   * 三步顺序操作，错误则重置
   * ===================================================== */
  function renderLevel3() {
    var steps = [
      { label: '变成副手在卫生间外等候', desc: '情报：霍恩每天 4:17 去卫生间 11 分钟' },
      { label: '用麻醉毛巾通过门缝通风系统迷晕霍恩', desc: '通过通风管道投放麻醉剂' },
      { label: '取指尖血 + 后脑短发 + 拔一颗槽牙', desc: 'DNA + 发根毛囊 + 牙釉质蛋白质标记' }
    ];
    var current = 0;
    var stepEls = [];

    var root = buildRoot(3);
    root.appendChild(el('div', 'chameleon-target',
      '<strong>目标：</strong>监控中心主任霍恩从不留完整样本，需多步骤秘密获取。<br>' +
      '按正确顺序执行三个步骤，采集完整身份特征。'));

    var stepsWrap = el('div', 'chameleon-items');
    stepsWrap.style.flexDirection = 'column';

    steps.forEach(function (s, i) {
      var card = el('div', 'collect-item');
      card.style.textAlign = 'left';
      card.style.cursor = 'pointer';
      var labelDiv = el('div', null, '步骤 ' + (i + 1) + ' · ' + s.label);
      labelDiv.style.cssText = 'font-size:15px;color:' + C_TEXT + ';';
      card.appendChild(labelDiv);
      var descDiv = el('div', null, s.desc);
      descDiv.style.cssText = 'font-size:12px;color:' + C_TEXT_DIM + ';margin-top:6px;';
      card.appendChild(descDiv);
      card.onclick = function () { handleStep(i); };
      stepEls.push({ card: card, label: labelDiv });
      stepsWrap.appendChild(card);
    });
    root.appendChild(stepsWrap);

    var logEl = el('div', 'chameleon-log', '> 等待执行行动步骤...');
    root.appendChild(logEl);

    function resetSteps() {
      current = 0;
      stepEls.forEach(function (e) {
        e.card.classList.remove('collected');
        e.label.style.color = C_TEXT;
      });
    }

    function handleStep(i) {
      if (state.finished) return;
      if (stepEls[i].card.classList.contains('collected')) return;
      if (i === current) {
        stepEls[i].card.classList.add('collected');
        stepEls[i].label.style.color = C_SUCCESS;
        setLog(logEl, '> 步骤 ' + (i + 1) + ' 完成：' + steps[i].label, 'success');
        current++;
        if (current >= steps.length) {
          setLog(logEl,
            '> 指尖血、后脑短发、槽牙已获取。\n' +
            '> DNA 图谱、发根毛囊细胞、牙釉质蛋白质标记三项数据齐全。\n' +
            '> 霍恩的身份锁已破解。', 'success');
          finish(true);
        }
      } else {
        resetSteps();
        setLog(logEl, '> 步骤顺序错误，重新开始。', 'danger');
      }
    }

    getContainer().appendChild(root);
  }

  /* =====================================================
   * 入口
   * ===================================================== */
  function start(level, callback) {
    if (state.timer) { clearInterval(state.timer); state.timer = null; }
    state.callback = callback;
    state.finished = false;

    if (level === 1) renderLevel1();
    else if (level === 2) renderLevel2();
    else if (level === 3) renderLevel3();
    else if (typeof callback === 'function') callback(false);
  }

  return { start: start };
})();
