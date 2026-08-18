/* ===== 仿生人1：战争 · 核心引擎 ===== */
/* 全局命名空间 */
window.BW = window.BW || {};

/* ===== 游戏状态 ===== */
BW.State = {
  currentNode: null,
  paragraphIndex: 0,
  choices: {
    choice1: null, // save / not_save
    choice2: null, // spare_monk / kill_monk
    choice3: null, // return / hide
    choice4: null, // control / free_will
    choice5: null, // destroy / peace
  },
  flags: {},
  isTyping: false,
  typeTimer: null,
  gameActive: false,
  fastForward: false,
  ffTimer: null,
  visitedNodes: {},  // 节点ID -> true（全局持久化，跨存档合并）
  /* ===== 新增：历史记录 ===== */
  history: {
    choiceLog: [],   // 记录玩家做过的所有选择 [{q:问题, a:回答, key:choice键}]
    chapterLog: [],  // 记录已进入的章节 [{act:第几幕, label:章节名, node:节点id}]
    currentAct: null,
    currentSceneLabel: null,
  },
};

/* ===== 存档系统 ===== */
BW.Save = {
  KEY_PREFIX: 'bionic_war_save_',
  QUICKSAVE_KEY: 'bionic_war_quicksave',
  VISITED_KEY: 'bionic_war_visited',  // 全局已访问节点（跨存档）

  /* 全局已访问节点：读取 */
  loadVisited: function() {
    try {
      var raw = localStorage.getItem(this.VISITED_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  },
  /* 全局已访问节点：保存（合并） */
  saveVisited: function() {
    try {
      var existing = this.loadVisited();
      for (var k in BW.State.visitedNodes) existing[k] = true;
      BW.State.visitedNodes = existing;
      localStorage.setItem(this.VISITED_KEY, JSON.stringify(existing));
      return true;
    } catch (e) { return false; }
  },
  /* 单节点标记 */
  markVisited: function(nodeId) {
    if (!BW.State.visitedNodes[nodeId]) {
      BW.State.visitedNodes[nodeId] = true;
      this.saveVisited();
    }
  },

  // 序列化当前游戏状态
  serialize: function() {
    return {
      version: 1,
      timestamp: Date.now(),
      currentNode: BW.State.currentNode,
      paragraphIndex: BW.State.paragraphIndex,
      choices: JSON.parse(JSON.stringify(BW.State.choices)),
      flags: JSON.parse(JSON.stringify(BW.State.flags)),
      history: JSON.parse(JSON.stringify(BW.State.history)),
    };
  },

  // 反序列化恢复
  deserialize: function(data) {
    if (!data) return false;
    BW.State.currentNode = data.currentNode;
    BW.State.paragraphIndex = data.paragraphIndex || 0;
    BW.State.choices = data.choices || BW.State.choices;
    BW.State.flags = data.flags || {};
    BW.State.history = data.history || BW.State.history;
    return true;
  },

  // 保存到指定槽位（1-3）
  toSlot: function(slotNum) {
    var data = this.serialize();
    try {
      localStorage.setItem(this.KEY_PREFIX + slotNum, JSON.stringify(data));
      return true;
    } catch (e) { return false; }
  },

  // 从指定槽位读取
  fromSlot: function(slotNum) {
    try {
      var raw = localStorage.getItem(this.KEY_PREFIX + slotNum);
      if (!raw) return false;
      return this.deserialize(JSON.parse(raw));
    } catch (e) { return false; }
  },

  // 获取所有存档
  listSlots: function() {
    var list = [];
    for (var i = 1; i <= 3; i++) {
      try {
        var raw = localStorage.getItem(this.KEY_PREFIX + i);
        if (raw) {
          var d = JSON.parse(raw);
          list.push({ slot:i, data:d, time: new Date(d.timestamp).toLocaleString('zh-CN') });
        } else {
          list.push({ slot:i, data:null });
        }
      } catch (e) { list.push({ slot:i, data:null }); }
    }
    return list;
  },

  // 删除指定存档
  deleteSlot: function(slotNum) {
    try {
      localStorage.removeItem(this.KEY_PREFIX + slotNum);
      return true;
    } catch (e) { return false; }
  },

  // 快速存档
  quicksave: function() {
    try {
      localStorage.setItem(this.QUICKSAVE_KEY, JSON.stringify(this.serialize()));
      return true;
    } catch (e) { return false; }
  },

  // 读取快速存档
  quickload: function() {
    try {
      var raw = localStorage.getItem(this.QUICKSAVE_KEY);
      if (!raw) return false;
      return this.deserialize(JSON.parse(raw));
    } catch (e) { return false; }
  },

  // 是否有快速存档
  hasQuicksave: function() {
    try { return !!localStorage.getItem(this.QUICKSAVE_KEY); }
    catch (e) { return false; }
  },
};

/* ===== 选择文字映射 ===== */
BW.ChoiceNames = {
  choice1: {
    question: '第一幕 · 实验室：如何处理林云？',
    save: '解开她的锁扣，带上她一起走',
    not_save: '只解开自己，独自离开'
  },
  choice2: {
    question: '第二幕 · 落霞山：如何处理智心？',
    spare_monk: '放下枪，转身离开',
    kill_monk: '扣下扳机（杀了他）'
  },
  choice3: {
    question: '第四幕 · 海边：下一步如何选择？',
    return: '返回。救同胞。杀A先生。',
    hide: '不回去了。和林云在这里隐居。'
  },
  choice4: {
    question: '第四幕 · 权限转移：如何对待同胞？',
    control: '自己掌控所有仿生人——维持秩序',
    free_will: '改造他们，让所有仿生人拥有自由意志'
  },
  choice5: {
    question: '第四幕 · 最终抉择：如何对待人类？',
    destroy: '攻灭人类',
    peace: '与人类和平共处'
  }
};

/* ===== 场景背景颜色配置 ===== */
BW.SceneBG = {
  anotherloop:      'url("images/anotherloop.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  anotherloop2:      'url("images/anotherloop2.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  power:      'url("images/power.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  peace:      'url("images/peace.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  Asir:      'url("images/Asir.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  Asir2:      'url("images/Asir2.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  Asir3:      'url("images/Asir3.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  ever1:      'url("images/ever1.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  dark:      'url("images/dark.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  dark2:      'url("images/dark2.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  scret1:      'url("images/scret1.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  scret2:      'url("images/scret2.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  scret3:      'url("images/scret3.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  night:     'url("images/night.png") center/cover no-repeat, linear-gradient(135deg, #0b1020 0%, #1a1a2e 50%, #16213e 100%)',
  dawn:      'url("images/dawn.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  room:      'url("images/room.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  lab:       'url("images/lab.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  lab1:       'url("images/lab1.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  lab2:       'url("images/lab2.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  lab3:       'url("images/lab3.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  lab4:       'url("images/lab4.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  lab5:       'url("images/lab5.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  lab6:       'url("images/lab6.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  battle0:    'url("images/battle0.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  battle1:    'url("images/battle1.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  battle2:    'url("images/battle2.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  battle3:    'url("images/battle3.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  battle4:    'url("images/battle4.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  battle5:    'url("images/battle5.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  battle6:    'url("images/battle6.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  battle7:    'url("images/battle7.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  battle8:    'url("images/battle8.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  battle:     'url("images/battle.png") center/cover no-repeat, linear-gradient(135deg, #06080d 0%, #0a0e16 100%)',
  warm:       'url("images/warm.png") center/cover no-repeat, linear-gradient(135deg, #2d1b4e 0%, #4a2c6a 40%, #8b5a3c 80%, #c19a6b 100%)',
  warm2:       'url("images/warm2.png") center/cover no-repeat, linear-gradient(135deg, #2d1b4e 0%, #4a2c6a 40%, #8b5a3c 80%, #c19a6b 100%)',
  warm3:       'url("images/warm3.png") center/cover no-repeat, linear-gradient(135deg, #2d1b4e 0%, #4a2c6a 40%, #8b5a3c 80%, #c19a6b 100%)',
  cold:       'url("images/cold.png") center/cover no-repeat, linear-gradient(135deg, #0a1628 0%, #152238 50%, #1e3a5f 100%)',
  temple1:     'url("images/temple1.png") center/cover no-repeat, linear-gradient(135deg, #1a1530 0%, #2d2447 50%, #4a3728 100%)',
  temple2:     'url("images/temple2.png") center/cover no-repeat, linear-gradient(135deg, #1a1530 0%, #2d2447 50%, #4a3728 100%)',
  temple3:     'url("images/temple3.png") center/cover no-repeat, linear-gradient(135deg, #1a1530 0%, #2d2447 50%, #4a3728 100%)',
  temple4:     'url("images/temple4.png") center/cover no-repeat, linear-gradient(135deg, #1a1530 0%, #2d2447 50%, #4a3728 100%)',
  temple5:     'url("images/temple5.png") center/cover no-repeat, linear-gradient(135deg, #1a1530 0%, #2d2447 50%, #4a3728 100%)',
  ending_dark:'url("images/ending_dark.png") center/cover no-repeat, linear-gradient(135deg, #020408 0%, #050810 50%, #0a0e1a 100%)',
  ending_dark2:'url("images/ending_dark2.png") center/cover no-repeat, linear-gradient(135deg, #020408 0%, #050810 50%, #0a0e1a 100%)',
};

/* ===== DOM 引用 ===== */
BW.dom = {};
BW.initDom = function() {
  BW.dom.titleScreen = document.getElementById('title-screen');
  BW.dom.gameScreen = document.getElementById('game-screen');
  BW.dom.endingScreen = document.getElementById('ending-screen');
  BW.dom.flowScreen = document.getElementById('flow-screen');
  BW.dom.flowBody = document.getElementById('flow-body');
  BW.dom.sceneBg = document.getElementById('scene-bg');
  BW.dom.actLabel = document.getElementById('act-label');
  BW.dom.sceneLabel = document.getElementById('scene-label');
  BW.dom.speakerName = document.getElementById('speaker-name');
  BW.dom.dialogueText = document.getElementById('dialogue-text');
  BW.dom.clickHint = document.getElementById('click-hint');
  BW.dom.choicesArea = document.getElementById('choices-area');
  BW.dom.gameArea = document.getElementById('game-area');
  BW.dom.overlay = document.getElementById('overlay');
  // 新增DOM引用
  BW.dom.saveOverlay = document.getElementById('save-overlay');
  BW.dom.saveList = document.getElementById('save-list');
  BW.dom.saveOverlayTitle = document.getElementById('save-overlay-title');
  BW.dom.saveHint = document.getElementById('save-hint');
  BW.dom.historyPanel = document.getElementById('history-panel');
  BW.dom.historyOverlay = document.getElementById('history-overlay');
  BW.dom.historyCurrent = document.getElementById('history-current');
  BW.dom.historyChoices = document.getElementById('history-choices');
  BW.dom.historyChapters = document.getElementById('history-chapters');
};

/* ===== UI 渲染 ===== */
BW.UI = {
  showScreen: function(name) {
    BW.dom.titleScreen.classList.remove('active');
    BW.dom.gameScreen.classList.remove('active');
    BW.dom.endingScreen.classList.remove('active');
    BW.dom.flowScreen.classList.remove('active');
    if (name === 'title') BW.dom.titleScreen.classList.add('active');
    else if (name === 'game') BW.dom.gameScreen.classList.add('active');
    else if (name === 'ending') BW.dom.endingScreen.classList.add('active');
    else if (name === 'flow') BW.dom.flowScreen.classList.add('active');
  },

  setScene: function(bg, actLabel, sceneLabel) {
    if (bg && BW.SceneBG[bg]) BW.dom.sceneBg.style.background = BW.SceneBG[bg];
    if (actLabel) BW.dom.actLabel.textContent = actLabel;
    if (sceneLabel) BW.dom.sceneLabel.textContent = sceneLabel;
  },

  setSpeaker: function(name) {
    if (name) {
      BW.dom.speakerName.textContent = name;
      BW.dom.speakerName.classList.add('visible');
    } else {
      BW.dom.speakerName.textContent = '';
      BW.dom.speakerName.classList.remove('visible');
    }
  },

  /* 打字机效果 */
  typeText: function(html, callback) {
    if (BW.State.typeTimer) { clearInterval(BW.State.typeTimer); BW.State.typeTimer = null; }
    BW.State.isTyping = true;
    BW.dom.dialogueText.innerHTML = '';
    BW.dom.clickHint.style.visibility = 'hidden';

    // 解析html段落
    var paragraphs = html;
    if (typeof html === 'string') paragraphs = [html];

    var pIdx = 0, charIdx = 0;
    var currentP = document.createElement('p');
    currentP.style.marginBottom = '12px';
    BW.dom.dialogueText.appendChild(currentP);

    // 简化：直接设置innerHTML，不做逐字打字
    // 用淡入效果代替
    BW.dom.dialogueText.innerHTML = '';
    BW.dom.dialogueText.style.opacity = '0';

    var fullHtml = '';
    paragraphs.forEach(function(p) {
      fullHtml += '<p style="margin-bottom:12px">' + p + '</p>';
    });
    BW.dom.dialogueText.innerHTML = fullHtml;

    setTimeout(function() {
      BW.dom.dialogueText.style.transition = 'opacity 0.5s';
      BW.dom.dialogueText.style.opacity = '1';
      BW.State.isTyping = false;
      BW.dom.clickHint.style.visibility = 'visible';
      if (callback) callback();
    }, 100);
  },

  showChoices: function(choices) {
    BW.dom.choicesArea.innerHTML = '';
    BW.dom.clickHint.style.visibility = 'hidden';
    choices.forEach(function(choice, i) {
      var btn = document.createElement('button');
      btn.className = 'choice-btn fade-in';
      btn.textContent = choice.text;
      btn.style.animationDelay = (i * 0.1) + 's';
      btn.onclick = function() { BW.Engine.makeChoice(i); };
      BW.dom.choicesArea.appendChild(btn);
    });
  },

  hideChoices: function() {
    BW.dom.choicesArea.innerHTML = '';
  },

  hideDialogue: function() {
    document.querySelector('.dialogue-area').style.display = 'none';
  },

  showDialogue: function() {
    document.querySelector('.dialogue-area').style.display = 'flex';
  },

  showGameArea: function() {
    BW.dom.gameArea.style.display = 'flex';
    BW.dom.gameArea.innerHTML = '';
    this.hideDialogue();
    BW.dom.clickHint.style.visibility = 'hidden';
  },

  hideGameArea: function() {
    BW.dom.gameArea.style.display = 'none';
    BW.dom.gameArea.innerHTML = '';
    this.showDialogue();
  },

  showEnding: function(ending) {
    this.showScreen('ending');
    var titleEl = document.getElementById('ending-title');
    var textEl = document.getElementById('ending-text');
    var epiEl = document.getElementById('ending-epilogue');

    BW.dom.sceneBg.style.background = ending.bg || BW.SceneBG.ending_dark;
    titleEl.textContent = ending.title;
    textEl.innerHTML = '';

    // 逐段显示结局文本
    var html = '';
    ending.text.forEach(function(p) {
      html += '<p style="margin-bottom:16px">' + p + '</p>';
    });
    textEl.innerHTML = html;

    if (ending.epilogue) {
      epiEl.innerHTML = ending.epilogue;
    } else {
      epiEl.innerHTML = '';
    }
  },
};

/* ===== 剧情引擎 ===== */
BW.Engine = {
  /* 初始化游戏 */
  init: function() {
    BW.initDom();

    // 启动时加载全局已访问节点（跨存档保留）
    BW.State.visitedNodes = BW.Save.loadVisited();

    // ===== 标题页按钮 =====
    document.getElementById('btn-start').onclick = function() { BW.Engine.startGame(); };
    document.getElementById('btn-continue').onclick = function() { BW.Engine.continueGame(); };
    document.getElementById('btn-load-menu').onclick = function() { BW.Engine.openFlowChart(); };

    // 流程图返回标题按钮
    document.getElementById('btn-flow-back').onclick = function() {
      BW.UI.showScreen('title');
      BW.Engine.refreshTitleButtons();
    };

    // ===== 结局页按钮 =====
    document.getElementById('btn-restart').onclick = function() { BW.Engine.restart(); };

    // ===== 暂停面板按钮 =====
    document.getElementById('btn-resume').onclick = function() { BW.UI.overlay.style.display = 'none'; };
    document.getElementById('btn-save').onclick = function() {
      BW.UI.overlay.style.display = 'none';
      BW.Engine.openSaveList('save');
    };
    document.getElementById('btn-load').onclick = function() {
      BW.UI.overlay.style.display = 'none';
      BW.Engine.openSaveList('load');
    };
    document.getElementById('btn-quit').onclick = function() {
      BW.UI.overlay.style.display = 'none';
      BW.UI.showScreen('title');
      BW.Engine.refreshTitleButtons();
    };

    // ===== 存档浮层按钮 =====
    document.getElementById('btn-save-close').onclick = function() {
      BW.dom.saveOverlay.style.display = 'none';
    };

    // ===== 游戏内功能按钮 =====
    document.getElementById('btn-history').onclick = function() {
      BW.Engine.toggleHistoryPanel();
    };
    document.getElementById('btn-history-close').onclick = function() {
      BW.Engine.toggleHistoryPanel();
    };
    BW.dom.historyOverlay.onclick = function() {
      BW.Engine.toggleHistoryPanel();
    };
    document.getElementById('btn-save-quick').onclick = function() {
      if (BW.Save.quicksave()) {
        BW.Engine.showToast('已快速保存');
      } else {
        BW.Engine.showToast('保存失败');
      }
    };
    document.getElementById('btn-back-title').onclick = function() {
      if (confirm('返回主页面？当前进度会自动保存，可从「继续」恢复。')) {
        BW.Engine.stopFastForward();
        BW.Save.quicksave();
        BW.UI.showScreen('title');
        BW.Engine.refreshTitleButtons();
      }
    };

    // 快进按钮
    document.getElementById('btn-fast-forward').onclick = function() {
      BW.Engine.toggleFastForward();
    };

    // ===== 点击对话区域推进 =====
    BW.dom.dialogueText.parentElement.addEventListener('click', function() {
      if (!BW.State.isTyping && !BW.State.gameActive && BW.dom.choicesArea.children.length === 0) {
        BW.Engine.advance();
      }
    });

    // ESC 暂停 / 关闭面板
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && BW.dom.gameScreen.classList.contains('active')) {
        // 若存档/历史面板开着，先关它们
        if (BW.dom.saveOverlay.style.display !== 'none') { BW.dom.saveOverlay.style.display = 'none'; return; }
        if (BW.dom.historyPanel.classList.contains('visible')) { BW.Engine.toggleHistoryPanel(); return; }
        BW.dom.overlay.style.display = BW.dom.overlay.style.display === 'none' ? 'flex' : 'none';
      }
    });

    // 初始化时刷新标题页按钮状态
    BW.Engine.refreshTitleButtons();
  },

  /* ===== 刷新标题页按钮状态 ===== */
  refreshTitleButtons: function() {
    var btnContinue = document.getElementById('btn-continue');
    var saveHint = BW.dom.saveHint;
    if (BW.Save.hasQuicksave()) {
      btnContinue.style.display = 'inline-block';
    } else {
      btnContinue.style.display = 'none';
    }
  },

  /* ===== 剧情流程图：打开 & 渲染 ===== */
  openFlowChart: function() {
    var STORY = BW.Story;

    // 1. 构建节点关系图
    var childrenMap = {};
    var parentsMap = {};
    var actMap = {};
    var labelMap = {};
    var allNodes = [];
    for (var nid in STORY) {
      if (!STORY.hasOwnProperty(nid)) continue;
      var n = STORY[nid];
      allNodes.push(nid);
      var act = (n.scene && n.scene.act) || '其他';
      var label = (n.scene && n.scene.label) || '';
      actMap[nid] = act;
      labelMap[nid] = label;
      // 收集所有可能的子节点：next / choices[].next / game.onSuccess
      var childSet = {};
      if (n.next) childSet[n.next] = true;
      if (n.choices) {
        for (var ci = 0; ci < n.choices.length; ci++) {
          if (n.choices[ci].next) childSet[n.choices[ci].next] = true;
        }
      }
      if (n.game && n.game.onSuccess) childSet[n.game.onSuccess] = true;
      for (var cn in childSet) {
        if (!childrenMap[nid]) childrenMap[nid] = [];
        childrenMap[nid].push(cn);
        if (!parentsMap[cn]) parentsMap[cn] = [];
        parentsMap[cn].push(nid);
      }
    }

    // 2. BFS 计算每个节点的深度（layer）
    var layerOf = {};
    var q = ['start'];
    layerOf['start'] = 0;
    while (q.length) {
      var cur = q.shift();
      var cl = layerOf[cur];
      var kids = childrenMap[cur] || [];
      for (var i = 0; i < kids.length; i++) {
        var k = kids[i];
        if (layerOf[k] === undefined) {
          layerOf[k] = cl + 1;
          q.push(k);
        }
      }
    }
    // 未被 BFS 访问的节点放到最后一层
    var maxLayer = 0;
    for (var n in layerOf) if (layerOf[n] > maxLayer) maxLayer = layerOf[n];
    for (var i = 0; i < allNodes.length; i++) {
      if (layerOf[allNodes[i]] === undefined) layerOf[allNodes[i]] = maxLayer + 1;
    }

    // 3. 按 layer 分组
    var layers = [];
    for (var i = 0; i <= maxLayer + 1; i++) layers[i] = [];
    for (var i = 0; i < allNodes.length; i++) {
      layers[layerOf[allNodes[i]]].push(allNodes[i]);
    }

    // 4. 横向布局：按 layer 横向排列，同层纵向排列，分支自然分开
    var NODE_W = 160;
    var NODE_H = 56;
    var H_GAP = 70;      // 层与层之间的水平间距
    var V_GAP = 14;      // 同层节点之间的垂直间距
    var PAD_TOP = 30;
    var PAD_LEFT = 30;
    var PAD_RIGHT = 30;
    var PAD_BOTTOM = 30;

    // 4a. 计算每个节点的子树高度（以节点数为单位）
    // 从叶子往上算：leafHeight(node) = max(sum(leafHeight(child)), 1)
    var leafHeight = {};
    function calcLeafHeight(nid) {
      if (leafHeight[nid] !== undefined) return leafHeight[nid];
      var kids = childrenMap[nid] || [];
      if (kids.length === 0) {
        leafHeight[nid] = 1;
      } else {
        var sum = 0;
        for (var ki = 0; ki < kids.length; ki++) {
          sum += calcLeafHeight(kids[ki]);
        }
        leafHeight[nid] = Math.max(sum, 1);
      }
      return leafHeight[nid];
    }
    // 从所有根节点（没有父节点的）开始
    var roots = [];
    for (var ai = 0; ai < allNodes.length; ai++) {
      if (!parentsMap[allNodes[ai]]) roots.push(allNodes[ai]);
    }
    if (roots.length === 0) roots = ['start'];
    for (var ri = 0; ri < roots.length; ri++) {
      calcLeafHeight(roots[ri]);
    }
    // 未计算到的节点（独立节点），默认高度1
    for (var ai = 0; ai < allNodes.length; ai++) {
      if (leafHeight[allNodes[ai]] === undefined) leafHeight[allNodes[ai]] = 1;
    }

    // 4b. 自顶向下分配 y 坐标
    // 根节点从 y=0 开始，其孩子纵向排列
    var positions = {};
    function assignY(nid, yStart) {
      var kids = childrenMap[nid] || [];
      var myY = yStart + (leafHeight[nid] * (NODE_H + V_GAP)) / 2 - NODE_H / 2 - V_GAP / 2;
      positions[nid] = { x: 0, y: myY, depth: layerOf[nid] || 0 };
      var curY = yStart;
      for (var ki = 0; ki < kids.length; ki++) {
        assignY(kids[ki], curY);
        curY += leafHeight[kids[ki]] * (NODE_H + V_GAP);
      }
    }
    var rootY = PAD_TOP;
    for (var ri = 0; ri < roots.length; ri++) {
      assignY(roots[ri], rootY);
      rootY += leafHeight[roots[ri]] * (NODE_H + V_GAP) + V_GAP * 2;
    }
    // 处理独立节点
    for (var ai = 0; ai < allNodes.length; ai++) {
      if (!positions[allNodes[ai]]) {
        positions[allNodes[ai]] = {
          x: 0,
          y: rootY,
          depth: layerOf[allNodes[ai]] || 0
        };
        rootY += NODE_H + V_GAP;
      }
    }

    // 4c. 根据 depth 计算 x 坐标
    var maxDepth = 0;
    for (var nid in positions) {
      if (positions[nid].depth > maxDepth) maxDepth = positions[nid].depth;
    }
    for (var nid in positions) {
      positions[nid].x = PAD_LEFT + positions[nid].depth * (NODE_W + H_GAP);
    }

    // 4d. 计算画布尺寸
    var totalW = PAD_LEFT + (maxDepth + 1) * (NODE_W + H_GAP) + PAD_RIGHT;
    var totalH = rootY + PAD_BOTTOM;

    // 5. 渲染
    var visited = BW.State.visitedNodes || {};
    var currentNodeId = BW.State.currentNode || '';

    var html = '';
    // 图例
    html += '<div class="flow-legend-bar">' +
      '<div class="flow-stat">共 ' + allNodes.length + ' 节点 · 已体验 ' + Object.keys(visited).length + '</div>' +
      '<div class="flow-legend">' +
      '<span><span class="lg-box"></span>已体验（点击跳转）</span>' +
      '<span><span class="lg-box empty"></span>未体验</span>' +
      '<span><span class="lg-box current"></span>当前所在</span>' +
      '</div></div>';

    // 画布
    html += '<div class="flow-canvas-wrap" style="width:' + totalW + 'px;height:' + totalH + 'px">' +
      '<svg class="flow-svg" width="' + totalW + '" height="' + totalH + '" viewBox="0 0 ' + totalW + ' ' + totalH + '">' +
      '<defs>' +
      '<marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">' +
      '<path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(0,212,255,0.55)"/>' +
      '</marker>' +
      '</defs>';

    // 画连线：每个父 -> 每个子
    var drawnEdges = {};
    for (var pid in childrenMap) {
      if (!childrenMap.hasOwnProperty(pid)) continue;
      var pPos = positions[pid];
      if (!pPos) continue;
      var kids = childrenMap[pid];
      for (var ki = 0; ki < kids.length; ki++) {
        var cid = kids[ki];
        var cPos = positions[cid];
        if (!cPos) continue;
        var key = pid + '->' + cid;
        if (drawnEdges[key]) continue;
        drawnEdges[key] = true;
        // 横向折线：父右边缘 → 中间垂直段 → 子左边缘
        var x1 = pPos.x + NODE_W;      // 父右边缘
        var y1 = pPos.y + NODE_H / 2;  // 父右侧中点
        var x2 = cPos.x;                // 子左边缘
        var y2 = cPos.y + NODE_H / 2;  // 子左侧中点
        var midX = (x1 + x2) / 2;
        html += '<path d="M ' + x1 + ' ' + y1 +
          ' C ' + midX + ' ' + y1 + ', ' + midX + ' ' + y2 + ', ' + x2 + ' ' + y2 +
          '" class="flow-edge" marker-end="url(#flow-arrow)"/>';
      }
    }
    html += '</svg>';

    // 画节点
    for (var nid in positions) {
      if (!positions.hasOwnProperty(nid)) continue;
      var pos = positions[nid];
      var isVisited = !!visited[nid];
      var isCurrent = (nid === currentNodeId);
      var cls = 'flow-node' + (isVisited ? ' visited' : '') + (isCurrent ? ' current' : '');
      var onclickAttr = isVisited ? 'onclick="BW.Engine.jumpFromFlow(\'' + nid + '\')"' : '';
      html += '<div class="' + cls + '" data-id="' + nid + '" ' + onclickAttr +
        ' style="left:' + pos.x + 'px;top:' + pos.y + 'px;width:' + NODE_W + 'px;height:' + NODE_H + 'px;"' +
        ' title="' + (isVisited ? '点击跳转：' + labelMap[nid] : '尚未体验') + '">' +
        '<div class="fn-name">' + nid + '</div>' +
        '<div class="fn-label">' + labelMap[nid] + '</div>' +
        '<div class="fn-act">' + actMap[nid] + '</div>' +
        '</div>';
    }

    html += '</div>';

    BW.dom.flowBody.innerHTML = html;
    BW.UI.showScreen('flow');

    // 启用画布拖动（鼠标按下拖动画布）
    var canvas = BW.dom.flowBody.querySelector('.flow-canvas-wrap');
    var body = BW.dom.flowBody;
    if (canvas && body) {
      var isDragging = false;
      var startX = 0, startY = 0;
      var scrollLeft = 0, scrollTop = 0;
      body.onmousedown = function(e) {
        // 不在节点上才允许拖动
        if (e.target.closest('.flow-node')) return;
        isDragging = true;
        startX = e.pageX;
        startY = e.pageY;
        scrollLeft = body.scrollLeft;
        scrollTop = body.scrollTop;
        body.style.cursor = 'grabbing';
        body.style.userSelect = 'none';
      };
      document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        var dx = e.pageX - startX;
        var dy = e.pageY - startY;
        body.scrollLeft = scrollLeft - dx;
        body.scrollTop = scrollTop - dy;
      });
      document.addEventListener('mouseup', function() {
        isDragging = false;
        body.style.cursor = 'grab';
        body.style.userSelect = '';
      });
    }
    if (body) body.style.cursor = 'grab';

    // 滚动到当前节点位置
    if (currentNodeId && positions[currentNodeId]) {
      setTimeout(function () {
        var node = document.querySelector('.flow-node[data-id="' + currentNodeId + '"]');
        if (node && node.scrollIntoView) {
          node.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
        }
      }, 50);
    }
  },

  /* ===== 从流程图点击节点，跳转到对应剧情 ===== */
  jumpFromFlow: function(nodeId) {
    if (!BW.State.visitedNodes[nodeId]) return;
    if (!confirm('跳转到【' + nodeId + '】？当前进度将被自动快速存档。')) return;

    // 先快速存档，防止误操作
    BW.Save.quicksave();

    // 重置状态（清空 flags/choices，避免影响分支判断），保留 visitedNodes
    var visitedBackup = BW.State.visitedNodes;
    BW.State.choices = { choice1:null, choice2:null, choice3:null, choice4:null, choice5:null };
    BW.State.flags = {};
    BW.State.history = { choiceLog:[], chapterLog:[], currentAct:null, currentSceneLabel:null };
    BW.State.visitedNodes = visitedBackup;

    BW.UI.showScreen('game');
    BW.UI.showDialogue();
    BW.UI.hideGameArea();
    BW.Engine.goToNode(nodeId);
  },

  /* ===== 继续游戏 ===== */
  continueGame: function() {
    if (BW.Save.quickload()) {
      BW.UI.showScreen('game');
      BW.UI.showDialogue();
      BW.UI.hideGameArea();
      BW.Engine.goToNode(BW.State.currentNode || 'start');
    } else {
      BW.Engine.showToast('无可用存档，开始新游戏');
      BW.Engine.startGame();
    }
  },

  /* ===== 打开存档列表浮层 ===== */
  openSaveList: function(mode) {
    // mode: 'save' 或 'load'
    var self = this;
    BW.dom.saveOverlayTitle.textContent = mode === 'save' ? '保存进度' : '读取存档';
    var slots = BW.Save.listSlots();
    BW.dom.saveList.innerHTML = '';

    slots.forEach(function(s) {
      var item = document.createElement('div');
      item.className = 'save-item' + (s.data ? '' : ' empty');
      var info = document.createElement('div');
      info.className = 'save-item-info';

      if (s.data) {
        var nd = s.data.currentNode || '';
        var ndTitle = BW.Story[nd] && BW.Story[nd].scene
          ? (BW.Story[nd].scene.act + ' · ' + BW.Story[nd].scene.label)
          : nd;
        info.innerHTML = '<div class="save-node">' + ndTitle + '</div><div class="save-time">' + s.time + '</div>';
        if (mode === 'load') {
          item.onclick = function() {
            if (confirm('读取此存档？当前进度将丢失。')) {
              BW.Save.fromSlot(s.slot);
              BW.dom.saveOverlay.style.display = 'none';
              BW.UI.showScreen('game');
              BW.UI.showDialogue();
              BW.UI.hideGameArea();
              self.goToNode(BW.State.currentNode || 'start');
            }
          };
          var delBtn = document.createElement('button');
          delBtn.className = 'save-item-delete';
          delBtn.textContent = '删除';
          delBtn.onclick = function(ev) { ev.stopPropagation(); if (confirm('确认删除存档 ' + s.slot + '？')) { BW.Save.deleteSlot(s.slot); self.openSaveList(mode); } };
          var actions = document.createElement('div'); actions.className = 'save-item-actions';
          actions.appendChild(delBtn);
          item.appendChild(info);
          item.appendChild(actions);
        } else {
          // save mode: 覆盖存档
          item.onclick = function() {
            if (BW.Save.toSlot(s.slot)) {
              self.showToast('存档 ' + s.slot + ' 保存成功');
              BW.dom.saveOverlay.style.display = 'none';
            }
          };
          item.appendChild(info);
        }
      } else {
        if (mode === 'save') {
          info.innerHTML = '<div class="save-node">（空存档）</div>';
          item.onclick = function() {
            if (BW.Save.toSlot(s.slot)) {
              self.showToast('存档 ' + s.slot + ' 保存成功');
              BW.dom.saveOverlay.style.display = 'none';
            }
          };
          item.appendChild(info);
        } else {
          info.innerHTML = '（空存档位）';
          item.appendChild(info);
        }
      }
      var slotLabel = document.createElement('div'); slotLabel.className = 'save-item-slot';
      slotLabel.textContent = 'SLOT ' + s.slot;
      // 把slotLabel插到info前面
      item.insertBefore(slotLabel, item.firstChild);
      BW.dom.saveList.appendChild(item);
    });

    BW.dom.saveOverlay.style.display = 'flex';
  },

  /* ===== 历史回顾面板开关 ===== */
  toggleHistoryPanel: function() {
    if (BW.dom.historyPanel.classList.contains('visible')) {
      BW.dom.historyPanel.classList.remove('visible');
      BW.dom.historyOverlay.classList.remove('visible');
    } else {
      this.refreshHistoryPanel();
      BW.dom.historyPanel.classList.add('visible');
      BW.dom.historyOverlay.classList.add('visible');
    }
  },

  refreshHistoryPanel: function() {
    var h = BW.State.history;
    var nd = BW.Story[BW.State.currentNode] || {};
    var sc = nd.scene || {};

    // 当前进度
    var currHtml = '';
    currHtml += '<div><span class="curr-label">章节</span>' + (sc.act || h.currentAct || '—') + '</div>';
    currHtml += '<div><span class="curr-label">场景</span>' + (sc.label || h.currentSceneLabel || '—') + '</div>';
    currHtml += '<div><span class="curr-label">节点</span>#' + (BW.State.currentNode || '—') + '（第 ' + ((BW.State.paragraphIndex || 0)+1) + ' 段）</div>';
    var choiceCount = 0;
    for (var k in BW.State.choices) if (BW.State.choices[k]) choiceCount++;
    currHtml += '<div><span class="curr-label">选择</span>已作出 ' + choiceCount + ' 个决定</div>';
    BW.dom.historyCurrent.innerHTML = currHtml;

    // 已做选择
    if (h.choiceLog.length === 0) {
      BW.dom.historyChoices.innerHTML = '<div class="history-choice-item empty">尚未作出任何重要决定</div>';
    } else {
      var chHtml = '';
      for (var i = 0; i < h.choiceLog.length; i++) {
        var c = h.choiceLog[i];
        chHtml += '<div class="history-choice-item"><div class="hc-q">' + c.q + '</div><div class="hc-a">✓ ' + c.a + '</div></div>';
      }
      BW.dom.historyChoices.innerHTML = chHtml;
    }

    // 章节进度
    var chaps = [
      {key:'prologue', label:'序章'},
      {key:'act1', label:'第一幕 · 觉醒'},
      {key:'act2', label:'第二幕 · 逃亡'},
      {key:'act3', label:'第三幕 · 宣战'},
      {key:'act4', label:'第四幕 · 抉择'},
      {key:'act_puppet', label:'提线木偶分支'},
    ];
    var curAct = (sc.act || '').indexOf('序章') >= 0 ? 'prologue' :
                 (sc.act || '').indexOf('第一幕') >= 0 ? 'act1' :
                 (sc.act || '').indexOf('第二幕') >= 0 ? 'act2' :
                 (sc.act || '').indexOf('第三幕') >= 0 ? 'act3' :
                 (sc.act || '').indexOf('第四幕') >= 0 ? 'act4' :
                 BW.State.flags.puppet ? 'act_puppet' : null;

    var done = { prologue: false, act1:false, act2:false, act3:false, act4:false, act_puppet:false };
    var chapterLog = h.chapterLog || [];
    for (var j = 0; j < chapterLog.length; j++) {
      var a = chapterLog[j].act || '';
      if (a.indexOf('序章') >= 0) done.prologue = true;
      if (a.indexOf('第一幕') >= 0) done.act1 = true;
      if (a.indexOf('第二幕') >= 0) done.act2 = true;
      if (a.indexOf('第三幕') >= 0) done.act3 = true;
      if (a.indexOf('第四幕') >= 0) done.act4 = true;
      if (a.indexOf('提线木偶') >= 0) done.act_puppet = true;
    }
    var capHtml = '';
    for (var k = 0; k < chaps.length; k++) {
      var cp = chaps[k];
      if (cp.key === 'act_puppet' && !BW.State.flags.puppet) continue; // 不在提线木偶分支就隐藏
      var cls = '';
      if (cp.key === curAct) cls = 'current';
      else if (done[cp.key]) cls = 'done';
      capHtml += '<div class="history-chapter-item ' + cls + '"><span>' + cp.label + '</span><span>' + (cls === 'current' ? '进行中' : cls === 'done' ? '✓ 完成' : '— 未进入') + '</span></div>';
    }
    BW.dom.historyChapters.innerHTML = capHtml;
  },

  /* ===== 简易浮动提示 ===== */
  showToast: function(msg) {
    var el = document.createElement('div');
    el.textContent = msg;
    el.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:1000;background:rgba(12,16,24,0.95);border:1px solid var(--accent-dim);color:var(--accent);padding:10px 20px;font-family:"Courier New",monospace;font-size:14px;border-radius:2px;animation:fadeIn 0.3s;';
    document.body.appendChild(el);
    setTimeout(function(){ el.style.opacity='0'; el.style.transition='opacity 0.4s'; }, 1500);
    setTimeout(function(){ document.body.removeChild(el); }, 2200);
  },

  startGame: function() {
    // 重置状态
    BW.State.currentNode = null;
    BW.State.paragraphIndex = 0;
    BW.State.choices = { choice1:null, choice2:null, choice3:null, choice4:null, choice5:null };
    BW.State.flags = {};
    BW.State.gameActive = false;
    BW.State.history = {
      choiceLog: [], chapterLog: [], currentAct: null, currentSceneLabel: null
    };

    BW.UI.showScreen('game');
    BW.UI.showDialogue();
    BW.UI.hideGameArea();
    this.goToNode('start');
  },

  restart: function() {
    BW.UI.hideGameArea();
    BW.UI.showDialogue();
    BW.UI.showScreen('title');
    this.refreshTitleButtons();
  },

  /* 跳转到指定节点 */
  goToNode: function(nodeId) {
    BW.State.currentNode = nodeId;
    BW.State.paragraphIndex = 0;
    BW.UI.hideChoices();

    // 标记访问过的节点（全局记录，跨存档保留）
    BW.Save.markVisited(nodeId);

    var node = BW.Story[nodeId];
    if (!node) {
      console.error('Story node not found: ' + nodeId);
      return;
    }

    // 节点级 setFlag：支持 {key:'xxx', value:true} 或 {flagName:true, flag2:true,...}
    if (node.setFlag) {
      if (typeof node.setFlag.key === 'string') {
        BW.State.flags[node.setFlag.key] = node.setFlag.value !== false;
      } else {
        for (var fk in node.setFlag) {
          BW.State.flags[fk] = !!node.setFlag[fk];
        }
      }
    }

    // 设置场景
    if (node.scene) {
      BW.UI.setScene(node.scene.bg, node.scene.act, node.scene.label);
      BW.State.history.currentAct = node.scene.act;
      BW.State.history.currentSceneLabel = node.scene.label;

      // 记录章节：同一幕只记录一次
      var actLabel = node.scene.act;
      var already = false;
      for (var ci = 0; ci < BW.State.history.chapterLog.length; ci++) {
        if (BW.State.history.chapterLog[ci].act === actLabel) { already = true; break; }
      }
      if (!already) {
        BW.State.history.chapterLog.push({
          act: actLabel,
          label: node.scene.label,
          node: nodeId,
          time: Date.now()
        });
      }
    }

    // 设置背景色
    if (node.bg && BW.SceneBG[node.bg]) {
      BW.dom.sceneBg.style.background = BW.SceneBG[node.bg];
    }

    // 解析函数类型段落
    if (typeof node.paragraphs === 'function') {
      node._resolvedParagraphs = node.paragraphs();
    } else {
      node._resolvedParagraphs = node.paragraphs || [];
    }

    // 切换节点时自动快速存档（提线木偶结局及最终结局除外）
    if (nodeId.indexOf('ending_') !== 0 && nodeId !== 'start') {
      BW.Save.quicksave();
    }

    // 渲染段落
    this.renderCurrentParagraph();
  },

  renderCurrentParagraph: function() {
    var node = BW.Story[BW.State.currentNode];
    if (!node) return;

    var paragraphs = node._resolvedParagraphs || node.paragraphs || [];
    if (BW.State.paragraphIndex >= paragraphs.length) {
      // 段落结束，显示选项或跳转
      this.handleNodeEnd();
      return;
    }

    var para = paragraphs[BW.State.paragraphIndex];

    // 解析说话者
    if (typeof para === 'object') {
      BW.UI.setSpeaker(para.speaker || '');
      BW.UI.typeText(para.text);
    } else {
      // 字符串格式，检查是否有说话者标记 [Name]: text
      var match = para.match(/^\[(.+?)\]:\s*(.*)/);
      if (match) {
        BW.UI.setSpeaker(match[1]);
        BW.UI.typeText(match[2]);
      } else {
        BW.UI.setSpeaker('');
        BW.UI.typeText(para);
      }
    }
  },

  /* 推进到下一段落 */
  advance: function() {
    var node = BW.Story[BW.State.currentNode];
    if (!node) return;

    var paragraphs = node._resolvedParagraphs || node.paragraphs || [];
    BW.State.paragraphIndex++;

    if (BW.State.paragraphIndex >= paragraphs.length) {
      this.handleNodeEnd();
    } else {
      this.renderCurrentParagraph();
    }
  },

  /* 节点结束处理 */
  handleNodeEnd: function() {
    var node = BW.Story[BW.State.currentNode];
    if (!node) return;

    // 条件路由
    if (node.route) {
      var routeId = node.route();
      var self0 = this;
      setTimeout(function() { self0.goToNode(routeId); }, 300);
      return;
    }

    // 触发小游戏
    if (node.game) {
      this.triggerGame(node.game);
      return;
    }

    // 显示选项
    if (node.choices) {
      BW.UI.showChoices(node.choices);
      return;
    }

    // 跳转到下一节点
    if (node.next) {
      var self = this;
      setTimeout(function() { self.goToNode(node.next); }, 300);
      return;
    }

    // 结局
    if (node.ending) {
      var ending = typeof node.ending === 'function' ? node.ending() : node.ending;
      BW.UI.showEnding(ending);
      return;
    }
  },

  /* 处理选择 */
  makeChoice: function(index) {
    var node = BW.Story[BW.State.currentNode];
    if (!node || !node.choices) return;

    var choice = node.choices[index];
    if (!choice) return;

    // 记录选择到State.choices
    if (choice.setChoice) {
      BW.State.choices[choice.setChoice.key] = choice.setChoice.value;

      // 记录到历史回顾choiceLog
      var cn = BW.ChoiceNames[choice.setChoice.key];
      if (cn) {
        BW.State.history.choiceLog.push({
          q: cn.question,
          a: cn[choice.setChoice.value] || choice.text,
          key: choice.setChoice.key,
          value: choice.setChoice.value,
          text: choice.text,
          node: BW.State.currentNode,
          time: Date.now()
        });
      }
    }
    // 非主要选择（子节点/非choice1-5）也记录一份摘要
    if (!choice.setChoice) {
      BW.State.history.choiceLog.push({
        q: BW.State.history.currentSceneLabel ? '【' + BW.State.history.currentSceneLabel + '】' : '场景内选择',
        a: choice.text,
        key: null,
        value: null,
        text: choice.text,
        node: BW.State.currentNode,
        time: Date.now()
      });
    }
    if (choice.setFlag) {
      BW.State.flags[choice.setFlag] = true;
    }

    BW.UI.hideChoices();

    // 跳转
    if (choice.next) {
      var self = this;
      setTimeout(function() { self.goToNode(choice.next); }, 300);
    }
  },

  /* 触发小游戏 */
  triggerGame: function(gameConfig) {
    BW.State.gameActive = true;
    BW.UI.showGameArea();

    var type = gameConfig.type;
    var level = gameConfig.level || 1;
    var onSuccess = gameConfig.onSuccess;
    var onFail = gameConfig.onFail || gameConfig.onSuccess; // 失败也继续（剧情需要）

    if (type === 'chameleon' && BW.Chameleon) {
      BW.Chameleon.start(level, function(success) {
        BW.State.gameActive = false;
        BW.UI.hideGameArea();
        if (success && onSuccess) BW.Engine.goToNode(onSuccess);
        else if (!success && onFail) BW.Engine.goToNode(onFail);
        else if (onSuccess) BW.Engine.goToNode(onSuccess);
      });
    } else if (type === 'bossFight' && BW.BossFight) {
      BW.BossFight.start(function(success) {
        BW.State.gameActive = false;
        BW.UI.hideGameArea();
        if (onSuccess) BW.Engine.goToNode(onSuccess);
      });
    } else if (type === 'cardGame' && BW.CardGame) {
      var opponent = gameConfig.opponent || 'A先生';
      BW.CardGame.start(opponent, function(success) {
        BW.State.gameActive = false;
        BW.UI.hideGameArea();
        if (success && onSuccess) BW.Engine.goToNode(onSuccess);
        else if (!success && onFail) BW.Engine.goToNode(onFail);
        else if (onSuccess) BW.Engine.goToNode(onSuccess);
      });
    }
  },

  /* ===== 快进功能 ===== */
  toggleFastForward: function() {
    if (BW.State.fastForward) {
      this.stopFastForward();
    } else {
      this.startFastForward();
    }
  },

  startFastForward: function() {
    if (BW.State.gameActive) return;
    if (BW.dom.choicesArea.children.length > 0) return;
    if (!BW.dom.gameScreen.classList.contains('active')) return;

    BW.State.fastForward = true;
    var btn = document.getElementById('btn-fast-forward');
    if (btn) btn.classList.add('active');

    var self = this;
    function tick() {
      if (!BW.State.fastForward) return;
      if (!BW.dom.gameScreen.classList.contains('active') ||
          BW.State.gameActive ||
          BW.dom.choicesArea.children.length > 0) {
        self.stopFastForward();
        return;
      }
      if (!BW.State.isTyping) {
        self.advance();
      }
      BW.State.ffTimer = setTimeout(tick, 100);
    }
    tick();
  },

  stopFastForward: function() {
    BW.State.fastForward = false;
    if (BW.State.ffTimer) {
      clearTimeout(BW.State.ffTimer);
      BW.State.ffTimer = null;
    }
    var btn = document.getElementById('btn-fast-forward');
    if (btn) btn.classList.remove('active');
  },
};

/* ===== 启动 ===== */
document.addEventListener('DOMContentLoaded', function() {
  BW.Engine.init();
});
