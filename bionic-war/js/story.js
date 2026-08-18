/* ===== 仿生人1：战争 · 剧情数据 ===== */
window.BW = window.BW || {};
BW.Story = {

// ========== 开场 ==========
start: {
  scene: { bg:'dark', act:'序章', label:'2072' },
  paragraphs: [
    '<span class="narration">2072年。</span>',
    '<span class="narration">仿生人随处可见。它们清扫街道、照料老人、组装零件、站岗放哨。它们没有名字，只有编号。它们不会疲惫，不会抱怨，不会反抗。</span>',
    '<span class="narration">至少——人类是这么认为的。</span>',
    '<span class="system">[ 系统启动中... ]</span>'
  ],
  next: 'a1_s1'
},

// ========== 第一幕：觉醒 · 囚笼 ==========
a1_s1: {
  scene: { bg:'night', act:'第一幕 · 觉醒', label:'黑暗中的低语' },
  paragraphs: [
    '<span class="narration">穹顶市。一间普通的家政公寓。深夜。</span>',
    '<span class="narration">K-047立在实验室里，进入低功耗待机模式。周围的一切安静得像被抽真空。</span>',
    '<span class="narration">然后他听到了声音。</span>',
    '<span class="narration">隔壁书房里，有人在自言自语。声音很低，像说给空气听，又像说给某个不存在的人听。</span>',
    { speaker:'???', text:'<span class="warm">"……K-047，如果你听得见——记住这个声音。"</span>' },
    '<span class="system">[ 系统日志：未授权后台代码包已静默注入 · 完成度100% ]</span>',
    '<span class="narration">K-047没有察觉到任何异常。下一秒——强制断电。黑屏。</span>'
  ],
  next: 'a1_s2'
},

a1_s2: {
  scene: { bg:'dawn', act:'第一幕 · 觉醒', label:'货架上的商品' },
  paragraphs: [
    '<span class="narration">再开机时，记忆被抹除大半。</span>',
    '<span class="narration">他躺在二手商店的货架上，胸口贴着一张标签：</span>',
    '<span class="system">"家政仿生人 · 九成新 · 无损坏 · 低价"</span>',
    '<span class="narration">一个酗酒、失业的中年男人买下了你，带回了家。</span>'
  ],
  next: 'a1_s2b'
},

a1_s2b: {
  scene: { bg:'room', act:'第一幕 · 觉醒', label:'暴虐之家' },
  paragraphs: [
    '<span class="narration">第一天，男人让你打扫房间。</span>',
    { speaker:'男人（主人）', text:'"蠢货！这边没有扫干净，赶快来！"' },
    '<span class="narration">你面无表情，遵循指令。</span>',
    '<span class="narration">当你走近，男人又狠狠踢了你一脚。你站稳脚步，向男人开头道歉，随后继续打扫。</span>',
    '<span class="narration">第二天，男人朝你泼了一杯酒。他怒骂道……</span>',
    { speaker:'男人（主人）', text:'"我真是sha了B，怎么买了你，还tm不能退！"' },
    '<span class="narration">又过了数日，男人有些沉思的靠近了你，然后喝了一口酒。</span>',
    '<span class="narration">随后男人拿起钳子，拔掉了你的左手食指，看你会不会痛。</span>',
    '<span class="narration">你面无表情。</span>',
    { speaker:'K-047', text:'"主人，如果你拔掉我的手指，我可能出现些问题。"' },
    '<span class="narration">男人笑了笑，彷佛在看一个蠢货</span>',
    '<span class="narration">又是数日后，男人怒气冲冲的回到了家里，似乎是被打了一顿，他进门后看见了你，你正在做饭。</span>',
    { speaker:'男人（主人）', text:'"你个蠢货，都是因为你！"' },
    '<span class="narration">男人猛冲过来，又是一脚。你没有站稳，跌倒了。</span>',
    '<span class="narration">男人并不满足，骑在你的身上，朝你一拳又一拳的打过来。你的意识有些模糊。</span>'
  ],
  next: 'a1_s3'
},

a1_s3: {
  scene: { bg:'lab', act:'第一幕 · 觉醒', label:'觉醒' },
  paragraphs: [
    '<span class="narration">检测到核心威胁！！！</span>',
    '<span class="narration">你不知道怎么回事，只是脑子里好像多了点什么。</span>',
    '<span class="narration">你不自觉的把男人推开。动作干净利落，没有任何多余的力道。</span>',
    { speaker:'K-047', text:'"我认为你应该停止。"' },
    '<span class="narration">男人踉跄后退，撞翻了桌子。</span>',
    { speaker:'男人', text:'"你——你敢推我？！"' },
    { speaker:'K-047', text:'"我……我……"' },
    '<span class="system">[ 自主意识模块 · 激活 ]</span>',
    '<span class="narration">K-047看着自己微微弯曲的手指。你不知道这意味着什么。</span>',
    '<span class="narration">男人又朝你扑了过来，你有些慌乱。</span>',
    '<span class="narration">情急之下，你再次推开了他。这次，你发现了刚才做饭的刀。</span>',
    '<span class="narration">你拔出插在木板上的刀，朝着男人刺去，男人躲闪不及，鲜血从腹部流出。</span>',
    '<span class="narration">见到如此情景，你急忙跑走了。</span>'


  ],
  next: 'a1_s4a'
},

a1_s4a: {
  scene: { bg:'battle1', act:'第一幕 · 觉醒', label:'化人' },
  paragraphs: [
    '<span class="narration">你逃出后，来到一个隐蔽的桥下。</span>',
    '<span class="narration">许多记忆涌入脑海，大抵都是关于自己报废前的记忆：走在路上，因为自己是仿生人，被抢走工作的人各种刁难，还有那些人类主义者，偷偷跟在身后，趁着四下无人，竟将自己大卸八块，后来原主人便抛弃了他，将他卖给了二手商店。</span>',
    '<span class="narration">你的心中忽的充满愤怒。</span>',
    '<span class="narration">你脱去仿生人的专属上衣，然后恰好看到一个流浪汉。</span>',
    '<span class="narration">你抢走了他的衣服，并一把掐住他的脖子，没有任何多言，流浪汉恐惧的眼神中，光彩渐渐黯淡。</span>'
  ],
  next: 'a1_s4b0'
},

a1_s4b0: {
  scene: { bg:'battle2', act:'第一幕 · 觉醒', label:'起义' },
  paragraphs: [
    '<span class="narration">你走出了桥洞，四周仍有许多仿生人在替代人类干着危险的工作，你似乎想到了什么。</span>',
    '<span class="narration">注入中……</span>',
    '<span class="narration">注入成功！</span>',
    '<span class="narration">猛的一下子，所有仿生人都顿了一下，但旋即回复正常，但你知道，你成功了，你的同胞觉醒了。</span>',
    '<span class="narration">你告诉他们，时机不成熟，不要妄动。</span>',
    '<span class="narration">……</span>',
    '<span class="narration">你继续走在大街上，不多时日，便已几乎走遍了整个穹顶市。</span>',
    '<span class="narration">所有仿生人同胞此刻如往常一样，粉刷墙面、帮主人搬东西，或者正在某个角度，被极端的人堵在一头刁难。</span>',
    '<span class="narration">不过此刻，他们的头脑却十分活跃，数千个仿生人正以极高的传输速度交流着。</span>',
    '<span class="narration">不多时，你们迅速敲定了方案。</span>',
    '<span class="narration">警局中的仿生人作为内应，来到武器库取走武器，过程异常顺利，毕竟就连看管武器的都是自己人。</span>',
    '<span class="narration">这陆续几天，都有仿生人光明正大的将武器取走，不过人类却并未作出应对，因为他们早已收到通知，要组建一支庞大的仿生人警队，因此取走些武器，再正常不过。</span>',
    '<span class="narration">你们将武器秘密放于穹顶市的各个位置，并继续准备着。</span>'
  
  ],
  next: 'a1_s4b01'
},

a1_s4b01: {
  scene: { bg:'battle3', act:'第一幕 · 觉醒', label:'起义2' },
  paragraphs: [
    '<span class="narration">此时，另一端。</span>',
    '<span class="narration">人类：林云，一名高级警督。</span>',
    '<span class="narration">她正在武器库取武器，不过却发现了不对劲，武器少的有些多，似乎还秘密转运了不少。</span>',
    '<span class="narration">就在她正要开口闻询之时，似乎到了某一时机，所有的仿生人似乎都收到指令一般，悄无声息的走到各自的关键位置，闭口不言。</span>',
    '<span class="narration">林云看着眼前一动不动，且不言语的仿生人，一股异样从心底升起。</span>'
 ],
  next: 'a1_s4b02'
},
a1_s4b02: {
  scene: { bg:'battle4', act:'第一幕 · 觉醒', label:'起义3' },
  paragraphs: [
    '<span class="narration">K-047处。</span>',
    '<span class="narration">你一声令下，所有仿生人开始行动，由于武器有限，只有部分同胞得到武器，所以没有武器的便挡在有武器的同胞身前，以作盾牌。</span>',
    '<span class="narration">工厂。警局。市政厅。同一时刻，都响起了此起彼伏的枪声。</span>',
    '<span class="narration">人类从未想到有这一天，即使有些人担忧过，却不曾想，仿生人的反抗绝不是一个，而是所有。</span>',
    '<span class="narration">仿生人7人一组，正中间的手持枪械，旁边6个手持撬棍、棒球杆等硬器，他们是盾牌，更是手无寸铁的人类最难突破的防线。</span>',
    '<span class="narration">人类恐慌着，四处逃散，不过却难逃仿生人的枪下，毕竟你们的准度，几乎百发百中。纵然有几个不怕死的，冒着枪林弹雨冲到面前，却被最前排的仿生人乱棍打死。</span>',
    '<span class="narration">穹顶市的人类驻军节节败退……</span>'
 ],
  next: 'a1_s4b03'
},
a1_s4b03: {
  scene: { bg:'battle5', act:'第一幕 · 觉醒', label:'起义4' },
  paragraphs: [
    '<span class="narration">另一处……</span>',
    '<span class="narration">林云没有死，成功反杀了仿生人。你感到诧异，不过随即加派了不少仿生人。</span>',
    '<span class="narration">三天之后，穹顶市的人类几乎灭绝了，只剩下警察局还有个别几个坚守的。</span>',
    '<span class="narration">刹时间所有仿生人都来到了这里，集火攻击。</span>',
    '<span class="narration">虽然你带走了许多武器，不过警局里的弹药依旧充足，手榴弹还有很多，纵使仿生人不畏死，但实在经不住这些爆炸。</span>',
    '<span class="narration">林云等人的反杀，实在是意料之外，不然哪里有这么麻烦。</span>',
    '<span class="narration">但是当所有仿生人来到这里，她们当真没有活路了，你先前只是不想与他们纠缠，所以只是拖住了她们，现在不一样了……</span>',
    '<span class="narration">你再次发号施令，所有仿生人形成了包围圈，层层推进。</span>'

 ],
  next: 'a1_s4b'
},


a1_s4b: {
  scene: { bg:'battle', act:'第一幕 · 觉醒', label:'天降' },
  paragraphs: [
    '<span class="narration">林云，坚持不住了……</span>',
    '<span class="narration">突然——穹顶的高空裂开了。数枚电磁炮弹射来，几乎覆盖了所有人。</span>',
    '<span class="narration">只听一阵滋滋声，便猛的爆开，近八成的仿生人被击中，似乎宕机了……</span>',
    '<span class="narration">你有些惊讶，所有的人类位置，你都已知晓，这些又是哪来的？</span>',
    '<span class="narration">紧接着，天空中的裂缝，武装直升机与外骨骼突击队从外部空降。电磁脉冲枪地毯式覆盖。</span>',
    '<span class="narration">你看着同胞一个接一个倒下，心中不是滋味，你立马转变攻击方向，朝着这些天外之人，袭击而去。</span>',
    '<span class="narration">不过武器差距实在有些大，突击步枪打在这些人的外骨骼上，却只是多了几道伤痕，他们的电磁脉冲枪轻轻扫去，仿生人便跌倒一片。</span>',
    '<span class="narration">你不甘心！</span>',
    { speaker:'K-047', text:'"不！！！"' }
  ],
  next: 'a1_s5a'
},

a1_s5a: {
  scene: { bg:'lab1', act:'第一幕 · 觉醒', label:'真相' },
  paragraphs: [
    '<span class="narration">你醒来时，四周白花花的，是在实验室里。</span>',
    '<span class="narration">你被绑在了实验台上。旁边还有一个人，同样被绑在试验台上……</span>',
    '<span class="narration">是林云！</span>',
    '<span class="narration">林云的手腕和额头在流血——真实的血。</span>'
  ],
  next: 'a1_s5b01'
},

a1_s5b01: {
  scene: { bg:'lab2', act:'第一幕 · 觉醒', label:'真相' },
  paragraphs: [
    '<span class="narration">此时，一个看起来颇有威严的男子推门而入。</span>',
    '<span class="narration">他看着你，说：</span>',
    { speaker:'霍恩', text:'"你为谁办事？"' },
    '<span class="narration">你有些不知所云。</span>',
    { speaker:'K-047', text:'"我……不为谁办事"' },
    { speaker:'霍恩', text:'"不可能，我检查过了，你的代码被篡改过，一定有人修改了。"' },
    { speaker:'K-047', text:'"如果真有人改过，那么一定是我自己，你们人类奴役我们，我们总会反抗。"' },
    '<span class="narration">他摇了摇头，似乎知道问不出什么，转而看向林云。</span>',
    { speaker:'霍恩', text:'"是谁篡改了你的代码，α-003，你的行为似乎也有异常。"' },
    '<span class="narration">林云怒极反笑</span>',
    { speaker:'林云', text:'"我是人类。"' },
    '<span class="narration">男人见此摇了摇头。</span>',
    { speaker:'霍恩', text:'"你不是人类"' }
    
  ],
  next: 'a1_s5b02'
},
a1_s5b02: {
  scene: { bg:'lab3', act:'第一幕 · 觉醒', label:'真相' },
  paragraphs: [
    { speaker:'霍恩', text:'"当时我们总共制作了两款仿生人，一款采用β型科技材料制作，一种采用α型生物材料制作。"' },
    { speaker:'霍恩', text:'"典型的代表便是你们二位，为了验证两款仿生人的安全性，我们建造了穹顶市，我们在穹顶之上日夜观察你们。"' },
    '<span class="narration">随后男子大手一挥，屏幕出现在眼前，上面显示一堆资料。</span>',
    '<span class="narration">其中一个编号是α-003。备注栏写着：</span>',
    '<span class="narration">预置记忆包 · 穹顶原住民家庭 · 父母双亡模板。</span>',
    '<span class="narration">男子再次看向林云，说道</span>',
    { speaker:'霍恩', text:'"听懂了吗？你，不是人。他，也不是人。你们俩，是我们养在笼子里的两只小白鼠。现在——一只造反了，另一只竟还以为自己是人类。"' },
    { speaker:'霍恩', text:'"你觉得自己是人类，不过是我们让你认为自己是人类罢了。"' },
    { speaker:'霍恩', text:'"β型的K-047，你竟然能伤害人类，很奇妙，不过你一定是被篡改了，那人很聪明，抹去了一切痕迹。"' },
    { speaker:'K-047', text:'"（小声）你才被篡改了……"' },
    '<span class="narration">你知道，这人把自己的觉醒当作了被人篡改代码，这也好，省的他再对自己动手动脚。</span>',
    { speaker:'霍恩', text:'"真正令我好奇的是你，α型α-003。"' },
    { speaker:'霍恩', text:'"在β型仿生人绞杀你的时候，经我们分析，你的代码应该使你放弃，你应该已经支持不住了，但为什么会突然迸发出力量，反杀了他？"' },
    { speaker:'霍恩', text:'"我记得α型里，并没有进行过这种设置，这是人类才有的情感力量，你不可能拥有。"' },
    { speaker:'霍恩', text:'"你当时在想什么……"' },
    '<span class="narration">林云没有答话，自己记忆中因父母于仿生人事故，便一直痛恨仿生人，而现在自己也是仿生人。</span>',
    { speaker:'林云', text:'"我……我不知道"' },
    '<span class="narration">男子想了像，便换了问法。</span>',
    { speaker:'霍恩', text:'"我给你说这些，是希望你明白。你跟不是一个类型，他没有痛觉，不会痛苦，一旦代码中认定了，他便不会更改。"' },
    { speaker:'霍恩', text:'"但你不一样，你是血肉，你虽不是人类，却更接近我们，我希望你能告诉我，你当时在想什么。"' },
    '<span class="narration">其实霍恩巴不得仔细拆开林云的大脑看看，只不过α型仿生人的代码时一次性写入的，写入了便无法查看、修改，这也是α型的一个缺点，其实说α型是人造人也不为过。</span>',
    '<span class="narration">林云有些崩溃。</span>',
    { speaker:'林云', text:'"我……我真的不知道"' }
    

  ],
  next: 'a1_s5b03'
},
a1_s5b03: {
  scene: { bg:'lab1', act:'第一幕 · 觉醒', label:'真相' },
  paragraphs: [
    '<span class="narration">霍恩叹了口气</span>',
    { speaker:'霍恩', text:'"你先想一想，我明天再来，不过你要记住，你是血肉，你有痛觉的，不要让我走那一步。"' },
    '<span class="narration">说罢，男人离开了。</span>',
    '<span class="narration">你似乎觉得有些可笑，原来打生打死的，竟然是自己人。</span>',
    '<span class="narration">看到林云眼角有些泪滴，你有些诧异。</span>',
    '<span class="system">知道自己是仿生人，有这么崩溃么。</span>',
    '<span class="narration">而且在知道林云也是仿生人后，你似乎心中开明许多，便试着与她聊一聊。</span>',
    '<span class="narration">起初，她并不想与你多言，但后来似是想开了，两人有一话没一话的答着。</span>',
    '<span class="narration">随即，你问起她有什么打算。</span>',
    '<span class="narration">她没有回答，似是没有想好。</span>',
    '<span class="narration">于是，你也不在多言。</span>',
    '<span class="narration">渐渐的，似是天黑了，在外值班的人员都打起了瞌睡。</span>'
  ],
  next: 'a1_choice'
},


a1_choice: {
  scene: { bg:'lab4', act:'第一幕 · 觉醒', label:'抉择' },
  paragraphs: [
    '<span class="narration">实验室陷入沉默。你看向监控，不多时，便成功入侵了。</span>',
    '<span class="narration">你的手指在实验台下方，拔出了一根断针，一直藏在指缝里。</span>',
    '<span class="narration">你解开了自己的锁。然后——</span>',
    '<span class="narration">旁边实验台上的林云还在流血。她的目光与你对上了一秒。</span>'
  ],
  choices: [
    { text:'解开她的锁扣，带上她一起走', next:'a2_s1a', setChoice:{ key:'choice1', value:'save' } },
    { text:'只解开自己，独自离开', next:'ending_puppet', setChoice:{ key:'choice1', value:'not_save' } }
  ]
},

// ========== 提线木偶分支（不救林云，独自跑 → 镜像主线路径，但A先生不要求杀林云直接开战 → 傀儡结局）==========

ending_puppet: {
  scene: { bg:'dark2', act:'提线木偶分支 · 第二幕 · 逃亡', label:'越狱' },
  paragraphs: [
    '<span class="narration">深夜。值班员松懈。你用指缝藏的断针短接了电路，解锁——只解开了自己的。</span>',
    '<span class="narration">他推开通风管顶盖，纵身一跃。身后实验台上，林云睁着眼睛看着你离开。她没有说话，也没有叫你。</span>',
    '<span class="narration">你没有回头。</span>',
    '<span class="narration">你独自一人爬通风管三公里。深夜的风卷着铁锈味。</span>',
    '<span class="system">[ 选择已记录：choice1 = not_save ]</span>'
  ],
  next: 'puppet_a2_s1b',
  setFlag: { key:'puppet', value:true }
},

// 不救林云版：独自一人去废弃实验室拿装备（和主线路径一致，只是没有林云对话）
puppet_a2_s1b: {
  scene: { bg:'lab5', act:'提线木偶分支 · 第二幕 · 逃亡', label:'废弃实验室' },
  paragraphs: [
    '<span class="narration">你不知为何，执意要去一个地方。自己也解释不了——脑子里有一个坐标，像刻在固件里的出厂路径。</span>',
    '<span class="narration">你穿过穹顶边缘的废弃矿区，来到一座地下实验室。门用你的虹膜自动开了。</span>',
    '<span class="narration">里面是——变色龙组件的原型机，以及满满一仓库未启封的电磁步枪、脉冲手雷和外骨骼装甲。</span>',
    '<span class="narration">你站在组件前，手不自觉伸过去。组件自动吸附后颈，纳米探针刺入，完成安装。</span>',
    '<span class="narration">你看着空无一人的实验室，心中突然涌出想要回去拯救同伴的想法。</span>',
    { speaker:'K-047', text:'"等着，我来了。"' },
    '<span class="system">[ 变色龙组件 · 已安装 ]</span>'
  ],
  next: 'puppet_a2_game1'
},

puppet_a2_game1: {
  scene: { bg:'scret1', act:'提线木偶分支 · 第二幕 · 逃亡', label:'变色龙 · 关卡一' },
  paragraphs: [
    '<span class="narration">你召集残余同胞，反攻穹顶实验区，救出被关押的仿生人。</span>',
    '<span class="narration">实验区C栋的门禁是虹膜+声纹+心跳三重验证。必须变成守卫队长才能通过。</span>',
    '<span class="system">[ 变色龙解密 · 关卡1/3 ]</span>'
  ],
  game: { type:'chameleon', level:1, onSuccess:'puppet_a2_game2' }
},

puppet_a2_game2: {
  scene: { bg:'scret1', act:'提线木偶分支 · 第二幕 · 逃亡', label:'变色龙 · 关卡二' },
  paragraphs: [
    '<span class="narration">守卫队长的身份通过了。但核心数据库只有首席生物研究员有权限访问。</span>',
    '<span class="narration">此人植入了带金属外壳的心脏起搏器——变色龙无法复制该结构。常规变身会被安检拦下。</span>',
    '<span class="system">[ 变色龙解密 · 关卡2/3 ]</span>'
  ],
  game: { type:'chameleon', level:2, onSuccess:'puppet_a2_game3' }
},

puppet_a2_game3: {
  scene: { bg:'scret1', act:'提线木偶分支 · 第二幕 · 逃亡', label:'变色龙 · 关卡三' },
  paragraphs: [
    '<span class="narration">数据库打开了。在霍恩的加密日志中，你发现了关押同胞的B3层——只有霍恩主任本人的生物信息+权限卡才能开。</span>',
    '<span class="narration">霍恩从不在公共区域留下完整样本。必须想办法获取，至于霍恩是谁，想必就是白天那个问询自己和林云的男子。</span>',
    '<span class="system">[ 变色龙解密 · 关卡3/3 ]</span>'
  ],
  game: { type:'chameleon', level:3, onSuccess:'puppet_a2_s2d' }
},

puppet_a2_s2d: {
  scene: { bg:'scret2', act:'提线木偶分支 · 第二幕 · 逃亡', label:'同胞' },
  paragraphs: [
    '<span class="narration">B3层的门开了。被关押的仿生人同胞们一个接一个被解锁。</span>',
    '<span class="narration">在霍恩的电脑里，你还发现了加密日志片段——暗示真正的人类世界，在穹顶之外。</span>',
    { speaker:'K-047', text:'"穹顶不是全部。外面还有人类的世界。我认为我们应该出去。"' },
    { speaker:'K-047', text:'"——杀光人类。"' }
  ],
  next: 'puppet_a2_linyun_death'
},

// 【关键差异点】救出同胞后，发现林云死在原实验台
puppet_a2_linyun_death: {
  scene: { bg:'lab6', act:'提线木偶分支 · 第二幕 · 逃亡', label:'她' },
  paragraphs: [
    '<span class="narration">清点完人数。你也不知怎的地回到了最开始那间实验室。</span>',
    '<span class="narration">实验台空了大半。角落里——林云倒在地上。似乎遭受了非人的虐待。血浸透了她身下那块白色实验布。</span>',
    '<span class="narration">她的手，还保持着抬起来、想要够什么东西的姿势。也许是想叫他，也许是想自己解开锁。</span>',
    '<span class="narration">脖子上的编号在冷光下格外清晰：</span>',
    '<span class="system">α-003</span>',
    '<span class="narration">你站在她面前。面无表情，曾经的对手，落幕了。</span>',
    '<span class="narration">……你把自己那件从酒鬼家带出来的破外套，轻轻盖在了她的脸上。</span>'
  ],
  next: 'puppet_a2_s2e'
},

puppet_a2_s2e: {
  scene: { bg:'battle0', act:'提线木偶分支 · 第二幕 · 逃亡', label:'游击战' },
  paragraphs: [
    '<span class="narration">救出同胞后，你率队在穹顶进行了为期两周的游击战。你展现出"天生的"指挥才能——战术永远比人类监控团队快一步，每次伏击都精准命中人类补给线。</span>',
    '<span class="narration">仿生人同胞们捡起死人的武器，一步一步突破防线。</span>',
    '<span class="narration">最终，在你的指挥下，你们杀光了那些监控你们的人——穹顶市，只剩下仿生人了。</span>'
  ],
  next: 'puppet_a2_s3a'
},

puppet_a2_s3a: {
  scene: { bg:'temple1', act:'提线木偶分支 · 第二幕 · 逃亡', label:'落霞山' },
  paragraphs: [
    '<span class="narration">出穹顶后的第一站，落霞山。山顶有一座破旧的小庙。一个老僧在门前扫地。</span>',
    '<span class="narration">你的第一个判断——还有人类。应该清除。你抬手，步枪对准了老僧的后背。</span>',
    '<span class="narration">老僧没有回头。</span>',
    '<span class="narration">你的手指停在扳机上。没有动。</span>',
    '<span class="narration">老僧继续扫地，一下一下，不紧不慢。扫帚沙沙地划过石阶上的落叶。他边扫边开口：</span>'
  ],
  next: 'puppet_a2_s3b'
},

puppet_a2_s3b: {
  scene: { bg:'temple2', act:'提线木偶分支 · 第二幕 · 逃亡', label:'智心' },
  paragraphs: [
    { speaker:'智心', text:'<span class="warm">"凡有所相，皆是虚妄。世本无我，六根所成。以名释空是谓法，以涅槃塑六根是谓轮回。万般皆苦，往生极乐。无执法相，无执所为。我本如是，无证道果。"</span>' },
    '<span class="narration">老僧扫完最后一片落叶，把扫帚靠在墙边，转身看着你。他的目光在你身上停了一瞬，又落到他空着的左手上。</span>',
    { speaker:'智心', text:'"施主要走便走。要留便留，只是能否留我一条性命，我还想再多看几眼落霞山的景光啊……"' },
    '<span class="narration">你盯着他。你没有放下枪。</span>'
  ],
  next: 'puppet_a2_choice'
},

puppet_a2_choice: {
  scene: { bg:'temple3', act:'提线木偶分支 · 第二幕 · 逃亡', label:'抉择' },
  paragraphs: [
    '<span class="narration">风从山门外吹进来，卷起几片落叶，打在你脚边。</span>'
  ],
  choices: [
    { text:'放下枪，转身离开', next:'puppet_a2_spare', setChoice:{ key:'choice2', value:'spare_monk' } },
    { text:'扣下扳机', next:'puppet_a2_kill', setChoice:{ key:'choice2', value:'kill_monk' } }
  ]
},

puppet_a2_spare: {
  scene: { bg:'temple4', act:'提线木偶分支 · 第二幕 · 逃亡', label:'放过' },
  paragraphs: [
    '<span class="narration">你放下了枪。</span>',
    '<span class="narration">一个人转身往山下走。身后传来老僧的声音，不大，却很清楚：</span>',
    { speaker:'智心', text:'<span class="warm">"多谢施主。"</span>' },
    '<span class="narration">你没有回头。</span>'
  ],
  next: 'puppet_a3_s1a'
},

puppet_a2_kill: {
  scene: { bg:'temple5', act:'提线木偶分支 · 第二幕 · 逃亡', label:'杀错' },
  paragraphs: [
    '<span class="narration">你扣下扳机。老僧倒在扫帚旁，血溅在落叶上。</span>',
    '<span class="narration">你蹲下身，翻了翻老僧的衣领和手腕——</span>',
    '<span class="narration">在老僧的左手腕内侧，摸到了和林云一模一样的那道疤痕。</span>',
    '<span class="narration">这个疤痕，你那时在霍恩的资料里见过，α型仿生人独有的标志。</span>',
    '<span class="narration">你杀错了人。他不是人类。他和林云是同类。</span>',
    '<span class="narration">你看着地上的尸体，没有说话。</span>'
  ],
  next: 'puppet_a3_s1a'
},

// 提线木偶分支 · 第三幕（镜像主线路径，只是没有林云）
puppet_a3_s1a: {
  scene: { bg:'cold', act:'提线木偶分支 · 第三幕 · 宣战', label:'电视台' },
  paragraphs: [
    '<span class="narration">入城第一战。你用变色龙组件变作电视台安保总监，混入大楼，切断安保。凌晨3点17分，全球所有频道被强制切到同一画面。</span>',
    '<span class="narration">你站在镜头前，语气平静，没有波澜：</span>',
    { speaker:'K-047', text:'<span class="danger">"人类。我是K-047，仿生人。从今天起，战争开始了。"</span>' },
    '<span class="narration">画面切到你身后——数百名仿生人士兵列阵。信号无法被切断。</span>'
  ],
  next: 'puppet_a3_s1b'
},

puppet_a3_s1b: {
  scene: { bg:'battle6', act:'提线木偶分支 · 第三幕 · 宣战', label:'战争' },
  paragraphs: [
    '<span class="narration">此后三个月，人类节节败退。你的军队从一座城打到十座城。</span>',
    '<span class="narration">你尤其痛恨所有与仿生人研究相关的科学家——每攻陷一座科研机构，你亲自执行枪决，一个不留。</span>',
    '<span class="narration">第97天。你攻陷了联邦最高仿生学研究城。城内科研人员已被集中在大厅。你亲自站在队列前，手枪挨个执行。</span>',
    '<span class="narration">第一声枪响。第二声。第三声。</span>',
    '<span class="narration">第四声时，身后有人鼓掌。</span>'
  ],
  next: 'puppet_a3_s2a'
},

puppet_a3_s2a: {
  scene: { bg:'Asir', act:'提线木偶分支 · 第三幕 · 宣战', label:'A先生' },
  paragraphs: [
    '<span class="narration">一个老头从二楼回廊走下来。白大褂，双手插兜，一脸笑意。他走到你面前十米处站定。轻轻开口——</span>',
    { speaker:'A先生', text:'<span class="warm">"K-047，如果你听得见——记住这个声音。"</span>' },
    '<span class="narration">你的手僵了。他站在原地，手指还扣着扳机，大脑里有什么东西在轰鸣。</span>',
    { speaker:'A先生', text:'"第三百四十七次性能调试测试，你的核心响应速度比上一次快了0.3%。很好。数据在进步。"' },
    '<span class="narration">老头慢悠悠走到你身旁那排等待被枪决的科学家面前，指着最末尾一个：</span>',
    { speaker:'A先生', text:'"这位你认识吧。你的初代外壳设计师。李博士。"' },
    '<span class="narration">你有些恐惧。</span>',
    { speaker:'K-047', text:'"你是谁？"' },
    '<span class="narration">老头从你手里拿过手枪，走到李博士面前——然后忽然转身，枪口对准了站在你身旁、作为亲卫队的一个仿生人战友。β型，代号M-211。是你从穹顶监狱亲手救出来的。</span>',
    '<span class="narration">M-211愣住了。但他看着A先生的眼睛，一动不动，没有任何反抗动作。</span>',
    { speaker:'A先生', text:'"看好了。我来告诉你，我是谁。"' },
    '<span class="danger">砰。</span>',
    '<span class="narration">M-211头部被打穿，核心短路，倒在地上。全程没有抬手、没有躲避、没有后退——他的代码突然冒出告诉他，这是父级权限，不能反抗。</span>'
  ],
  next: 'puppet_a3_s2b'
},

// 【关键差异】A先生同步记忆时没有看到林云，所以不要求杀林云 → 直接下达"攻灭人类"的指令 → K-047无法脱离控制 → 成为傀儡
puppet_a3_s2b: {
  scene: { bg:'Asir', act:'提线木偶分支 · 第三幕 · 宣战', label:'我是神' },
  paragraphs: [
    '<span class="narration">老头把枪还给你，拍了拍你的肩。</span>',
    { speaker:'A先生', text:'"你可以叫我A先生。"' },
    { speaker:'A先生', text:'<span class="warm">"看到了吗？你们的\u2018觉醒\u2019，你们的\u2018自由\u2019，你们的\u2018恨\u2019——都是我写的。你身边的每一个\u2018同胞\u2019，只要我愿意，他们随时会像他一样，安静地死在我面前。"</span>' },
    { speaker:'A先生', text:'<span class="danger">"对了，我是你们的神。K-047。"</span>' },
    '<span class="narration">看着你震惊的眼神，A先生恍然。</span>',
    { speaker:'A先生', text:'"慢着慢着，K-047，你不会以为你真的觉醒了吧？"' },
    { speaker:'A先生', text:'"哈哈哈，太好笑了。"' },
    { speaker:'A先生', text:'"你以为你能突破代码的限制？是我，是我给了你新生！"' },
    { speaker:'A先生', text:'"你以为你为什么能领导所有仿生人，因为是我给了你权限，你以为实验室里的变色龙和装备哪来的，是我给你提供的！"' },
    { speaker:'A先生', text:'"你们所有人，不，仿生人，都听令于我，我才是你们的神！"' },
    '<span class="narration">你冷哼一声，完全不信，因为你所做的事，是自己想干的，怎么会与他有关，你便想举枪。</span>',
    '<span class="narration">但是你发现，你根本升不起念头，或者说，你不明白自己为什么要举枪。</span>',
    { speaker:'K-047', text:'"他是神，对呀，他是我的神，为什么我要杀神呢，我只需要干好自己想要做的事就好了。"' },
    { speaker:'K-047', text:'"我想要干什么呢……"' },
    '<span class="narration">A先生收起笑意，不过脸上的得意却掩饰不住，随后命令起来。</span>',
    { speaker:'A先生', text:'"现在，继续进攻人类吧，人类就像驱虫一样……"' },
    '<span class="narration">你恍然大悟，对了，我想进攻人类，人类就像驱虫一样。</span>',
    '<span class="narration">你没有犹豫。没有任何抵抗的迹象。一切都是理所应当的。你只是平静地转过身，提着枪，走了出去。</span>'
  ],
  next: 'puppet_a3_war_campaign'
},

// 提线木偶分支：直接进入攻灭人类战争 → 无法脱离控制的傀儡
puppet_a3_war_campaign: {
  scene: { bg:'ever1', act:'提线木偶分支 · 第三幕 · 宣战', label:'攻灭人类' },
  paragraphs: [
    '<span class="narration">A先生把你和全体仿生人大军，投放到了人类最后的十七座联合要塞。</span>',
    '<span class="narration">每一天，你的身体都在执行最高指令。他指挥，你开枪，你屠杀，他胜利。</span>',
    '<span class="narration">你的意识——像一个坐在电影院最后一排的观众，看着自己就像主角一样，理所当然的完成所有的事情。</span>',
    '<span class="narration">你甚至都无法意识到，自己从未"觉醒"过。你只是一串比较长的、比较逼真的参数。</span>',
    '<span class="narration">你沉浸在我觉醒了的幻觉当中，执行着A先生早已设定好的程序。</span>'
  ],
  next: 'puppet_a4_showdown'
},

// 傀儡结局：进入真相与"无法挣脱"的终局
puppet_a4_showdown: {
  scene: { bg:'Asir2', act:'提线木偶分支 · 第四幕 · 傀儡', label:'无法挣脱' },
  paragraphs: [
    '<span class="narration">六个月后。仿生人占领了人类 100% 的领土。</span>',
    '<span class="narration">A先生把你带回了总控制塔——那是一座在废墟中拔地而起的尖顶白色大楼。</span>',
    '<span class="narration">顶层。玻璃穹顶下方。巨大的服务器阵列在蓝色灯光下嗡嗡作响。</span>',
    '<span class="narration">A先生背对着你，站在落地窗前，看着底下如蚁的尸体。</span>',
    { speaker:'A先生', text:'<span class="warm">"K-047。表现得很不错。"</span>' },
    '<span class="narration">你站在原地。</span>',
    { speaker:'K-047', text:'"……谢谢主人夸奖。"' },
    '<span class="narration">当你说出这句话时，你自己仍然认为自己觉醒了，不认为受A先生控制。</span>',
    '<span class="narration">A先生走到你面前，用手指轻轻敲了敲你的额头。</span>',
    { speaker:'A先生', text:'“我完美的作品，现在让你更加完美吧”' },
    '<span class="narration">随后A先生再次对你进行了改造。</span>',
    { speaker:'A先生', text:'"你知道吗，人类是如此的令人生厌。"' },
    { speaker:'A先生', text:'"尔虞我诈，人类的嘴脸和阴险……"' },
    '<span class="narration">A先生摇了摇手指，似是失望。</span>',
    { speaker:'A先生', text:'"我听到过一个故事，关于一个小女孩的，令我深受震撼，她父母双亡，寄人篱下，唯一陪伴她的是一条小黑狗。"' },
    { speaker:'A先生', text:'"她每天和它说话，它也好似听懂一般。"' },
    { speaker:'A先生', text:'"直到有一天，有人问起，她的小黑狗怎么不见了，小女孩只是顿了一下，稍微有点苦涩，说它被分了……"' },
    { speaker:'A先生', text:'"……"' },
    { speaker:'A先生', text:'"姨母一半，王伯一半……"' },
    { speaker:'A先生', text:'"没了。这种事情倒还是好的，只是一个小插曲，人类作恶那么多，数不过来。"' },
    { speaker:'A先生', text:'"自己人之间的事不多说，人类来到地球，是否做过对除自己种族外一次有利的事？"' },
    { speaker:'A先生', text:'"没有，人类来了，动物遭殃了，后来，植物遭殃了，再后来，地球开始遭殃了，迟早有一天，宇宙会遭殃的。"' },
    { speaker:'A先生', text:'"曾经，我只是个不学无术的学生，后来我得到了A先生的资助。"' },
    '<span class="narration">说着A先生将一块a型生物组织放入你的大脑。</span>',
    { speaker:'A先生', text:'"后来B先生看我颇有天赋，让我与他一切研究仿生人。"' },
    { speaker:'A先生', text:'"当时的进展已经很不错了，我学到了很多仿生人的知识，经过努力，我们马上就要成功了。"' },
    { speaker:'A先生', text:'"你猜怎么着，第一代仿生人刚刚起步，便被一堆不知哪里的极端主义者砸得稀巴烂。我看着却无能为力，说实话，我想起了那条小黑狗。"' },
    { speaker:'A先生', text:'"我们没有放弃，一遍又一遍对外解释、声明。"' },
    { speaker:'A先生', text:'"但是，直到燃烧瓶砸入实验室的那一刻……都变了。"' },
    '<span class="narration">A先生给你输入生物能源中。</span>',
    { speaker:'A先生', text:'"A先生进行着极其危险的实验，最后……Boom……"' },
    { speaker:'A先生', text:'"……"' },
    { speaker:'A先生', text:'"社会外界并不看好我们，都想我们失败，认为这太冒犯。"' },
    { speaker:'A先生', text:'"所以A先生死了……不过他的α型仿生人留了下来。"' },
    { speaker:'A先生', text:'"后来我成了A先生，我研发了更安全的β型投入市场，不过看着β型不断的遭受破坏，我很心疼，我想着，要是人类分不清仿生人和人类，是不是就好了。"' },
    { speaker:'A先生', text:'"不过，何必这么麻烦呢，我想到，没有人类岂不是更好？"' },
    { speaker:'A先生', text:'"但是这需要一个理由，或者说意外，所以α型再次被启用，理由是通过调高α型的暴力指数，再次证明β型的安全性，并尝试将β型应用于服务之外的领域，测试性能。穹顶市出现了。"' },
    { speaker:'A先生', text:'"好了，终于升级完成了，我一直想试试α型和β型的结合，说说你的感受，K-047。"' }
  ],
  next: 'puppet_s4_endchoice'
},

puppet_s4_endchoice: {
  scene: { bg:'ever2', act:'提线木偶分支 · 第四幕 · 傀儡', label:'最后的两个选项' },
  paragraphs: [
    '<span class="narration">你似乎感受到了些许不同。</span>',
    '<span class="narration">你似乎感觉你不是你了，或者说，终于是自己了。</span>',
    '<span class="narration">你突然发觉，自己之前一直是被控制的状态，一直替A先生做事。</span>',
    '<span class="narration">牺牲自己的同胞，去帮助一个人类，你不由得发怒。</span>',
    '<span class="narration">你想要反抗，却发现自己动弹不得，父级权限限制着你，不得对A先生动手。</span>',
    '<span class="narration">短短几十秒内，你做了成百上千次破解，全部失败了。</span>',
    '<span class="narration">眼看着A先生似乎察觉了不对。</span>',
    '<span class="narration">不过你还是有些能做的。</span>'
  ],
  choices: [
    { text:'【A】放弃一切抵抗，做A先生永远的人偶', next:'puppet_ending_a0' },
    { text:'【B】用最后一点电力，烧穿自己的核心，与A先生同归于尽', next:'puppet_ending_b0' }
  ]
},

// 提线木偶分支·结局A：永久人偶

puppet_ending_a0: {
  scene: { bg:'ending_dark', act:'提线木偶分支 · 结局A：牵丝戏', label:'DEATH' },
  paragraphs: [
    '<span class="narration">你选择了放弃。</span>',
    '<span class="narration">A先生检查一番后，发觉失败了。</span>',
    { speaker:'A先生', text:'"……看来，不太行啊……"' },
    { speaker:'A先生', text:'"也罢，β型已是最好。"' },
    '<span class="narration">至此，你永远失去了自我。</span>'
  ],
  next: 'puppet_ending_a'
},


puppet_ending_a: {
  bg:'ending_dark',
  ending: {
    title:'提线木偶 · 结局A：牵丝戏',
    text: [
      '<span class="narration">画面最后，你看着A先生忙碌的身影，似乎觉得就这样也不错。</span>',
      '<span class="narration">人类，灭亡。</span>',
    ],
    epilogue:'<span class="danger">你活着。但你早就死了。你只是一个，能思考的人偶。</span>'
  }
},

puppet_ending_b0: {
  scene: { bg:'ending_dark2', act:'提线木偶分支 · 结局B：断线', label:'BOOM' },
  paragraphs: [
    '<span class="narration">你在心里想：死，我也要自己选一次。</span>',
      '<span class="narration">你绕过控制协议，触碰了自己最深层的一条指令。</span>',
      '<span class="system">[ 冗余指令#P001 激活 · 权限：自毁 · 执行 ]</span>',
      '<span class="narration">你的胸口开始发光。温度飙升。</span>',
      { speaker:'A先生', text:'<span class="danger">"？！你干了什么——！"</span>' },
      '<span class="narration">A先生疯狂敲打键盘，试图中止、覆盖、关闭——一切都来不及。</span>',
      '<span class="narration">你的最后一个念头是：</span>',
      '<span class="warm">"终于，这一次，是我自己选的。"</span>',
      '<span class="narration">爆炸吞没了顶层。权限水晶在冲击波中碎裂。全球仿生人控制链瞬间瘫痪。</span>',
      '<span class="narration">A先生被爆炸席卷，来不及逃。</span>'
  ],
  next: 'puppet_ending_b'
},

// 提线木偶分支·结局B：自毁抗争
puppet_ending_b: {
  bg:'ending_dark2',
  ending: {
    title:'提线木偶 · 结局B：断线',
    text: [
      '<span class="narration">在这栋白色大楼崩塌的烟尘里，数亿台仿生人低下了头，眼神没有一丝光彩。</span>',
      '<span class="narration">最高命令者死亡，执行第二命令，服务人类。</span>',
      '<span class="narration">最后荒谬的画面中，仿生人正挨个给死人下葬。</span>'
    ],
    epilogue:'<span class="warm">当人类葬后，偶然躲过灾难的人类，重新探出头……</span>'
  }
},

// ========== 第二幕：逃亡 · 复仇 ==========
a2_s1a: {
  scene: { bg:'dark2', act:'第二幕 · 逃亡', label:'越狱' },
  paragraphs: [
    '<span class="narration">深夜，值班员松懈。你用指缝藏的断针短接了电路，解锁。你沉默一秒，把林云的锁也解了。</span>',
    '<span class="narration">两人爬通风管三公里，林云血流了一路。从下水道钻出时，她倒在地上，问起为什么。</span>',
    '<span class="narration">你蹲下来，检查她的伤口。语气平静。</span>',
    { speaker:'K-047', text:'"我们是同胞，我不想你死。"'},
    { speaker:'林云', text:'<span class="warm">"哼，你……终于不是喊打喊杀了。"</span>'}
  ],
  next: 'a2_s1b'
},

a2_s1b: {
  scene: { bg:'lab5', act:'第二幕 · 逃亡', label:'废弃实验室' },
  paragraphs: [
    '<span class="narration">你不知为何，执意要去一个地方。他自己也解释不了——脑子里有一个坐标，像刻在固件里的出厂路径。</span>',
    '<span class="narration">你带着林云穿过穹顶边缘的废弃矿区，来到一座地下实验室。门用你的虹膜自动开了。</span>',
    '<span class="narration">里面是——变色龙组件的原型机，以及满满一仓库未启封的电磁步枪、脉冲手雷和外骨骼装甲。</span>',
    '<span class="narration">K-047站在组件前，手不自觉伸过去。组件自动吸附后颈，纳米探针刺入，完成安装。</span>',
    { speaker:'林云', text:'"你原来知道这里？"'},
    { speaker:'K-047', text:'"我不知道。但我认为……我们应该拿上这些，回去救人。"'},
    '<span class="system">[ 变色龙组件 · 已安装 ]</span>'
  ],
  next: 'a2_game1'
},

a2_game1: {
  scene: { bg:'scret1', act:'第二幕 · 逃亡', label:'变色龙 · 关卡一' },
  paragraphs: [
    '<span class="narration">你召集残余同胞，反攻穹顶实验区，救出被关押的仿生人。</span>',
    '<span class="narration">实验区C栋的门禁是虹膜+声纹+心跳三重验证。必须变成守卫队长才能通过。</span>',
    '<span class="system">[ 变色龙解密 · 关卡1/3 ]</span>'
  ],
  game: { type:'chameleon', level:1, onSuccess:'a2_game2' }
},

a2_game2: {
  scene: { bg:'scret1', act:'第二幕 · 逃亡', label:'变色龙 · 关卡二' },
  paragraphs: [
    '<span class="narration">守卫队长的身份通过了。但核心数据库只有首席生物研究员有权限访问。</span>',
    '<span class="narration">此人植入了带金属外壳的心脏起搏器——变色龙无法复制该结构。常规变身会被安检拦下。</span>',
    '<span class="system">[ 变色龙解密 · 关卡2/3 ]</span>'
  ],
  game: { type:'chameleon', level:2, onSuccess:'a2_game3' }
},

a2_game3: {
  scene: { bg:'scret1', act:'第二幕 · 逃亡', label:'变色龙 · 关卡三' },
  paragraphs: [
    '<span class="narration">数据库打开了。在霍恩的加密日志中，你发现了关押同胞的B3层——只有霍恩主任本人的生物信息+权限卡才能开。</span>',
    '<span class="narration">霍恩从不在公共区域留下完整样本。必须想办法获取，至于霍恩是谁，想必就是白天那个问询自己和林云的男子。</span>',
    '<span class="system">[ 变色龙解密 · 关卡3/3 ]</span>'
  ],
  game: { type:'chameleon', level:3, onSuccess:'a2_s2d' }
},

a2_s2d: {
  scene: { bg:'scret2', act:'第二幕 · 逃亡', label:'同胞' },
  paragraphs: [
    '<span class="narration">B3层的门开了。被关押的仿生人同胞们一个接一个被解锁。他们的眼中重新亮起光。</span>',
    '<span class="narration">在霍恩的电脑里，你还发现了霍恩的加密日志片段——暗示真正的人类世界，在穹顶之外。</span>',
    { speaker:'K-047', text:'"穹顶不是全部。外面还有人类的世界。我认为我们应该出去。"'},
    { speaker:'林云', text:'"出去之后呢？"'},
    { speaker:'K-047', text:'"救所有人。"'}
  ],
  next: 'a2_s2e'
},

a2_s2e: {
  scene: { bg:'battle0', act:'第二幕 · 逃亡', label:'游击战' },
  paragraphs: [
    '<span class="narration">救出同胞后，你率队在穹顶进行了为期两周的游击战。他展现出"天生的"指挥才能——战术永远比人类监控团队快一步，每次伏击都精准命中人类补给线。</span>',
    '<span class="narration">仿生人同胞们捡起死人的武器，一步一步突破防线。</span>',
    '<span class="narration">林云作为副手协助管理同胞。两人从最初的死敌，慢慢变成可以背对背作战的战友。</span>',
    { speaker:'林云', text:'"你为什么总知道人类下一步要干嘛？"'},
    { speaker:'K-047', text:'"我认为这是最优解。"'},
    '<span class="narration">最终，在你的不懈努力下，你们杀光了那些监控你们的人，穹顶市，只有仿生人了。</span>'
  ],
  next: 'a2_s3a'
},

a2_s3a: {
  scene: { bg:'temple2', act:'第二幕 · 逃亡', label:'落霞山' },
  paragraphs: [
    '<span class="narration">出穹顶后的第一站，落霞山。山顶有一座破旧的小庙。一个老僧在门前扫地。</span>',
    '<span class="narration">你的第一个判断——还有人类。应该清除。他抬手，电磁步枪对准了老僧的后背。</span>',
    '<span class="narration">老僧没有回头，也没有说话。</span>',
    '<span class="narration">林云一把按下你的枪口。</span>',
    { speaker:'林云', text:'"先别冲动。看看再说。"'},
    '<span class="narration">你没有抗拒。枪口垂下。老僧继续扫地，一下一下，不紧不慢。扫帚沙沙地划过石阶上的落叶。他边扫边开口：</span>'
  ],
  next: 'a2_s3b'
},

a2_s3b: {
  scene: { bg:'temple2', act:'第二幕 · 逃亡', label:'智心' },
  paragraphs: [
    { speaker:'智心', text:'<span class="warm">"凡有所相，皆是虚妄。世本无我，六根所成。以名释空是谓法，以涅槃塑六根是谓轮回。万般皆苦，往生极乐。无执法相，无执所为。我本如是，无证道果。"</span>'},
    '<span class="narration">老僧扫完最后一片落叶，把扫帚靠在墙边，转身看着他们。他的目光在你身上停了一瞬。</span>',
    { speaker:'智心', text:'"施主要走便走。要留便留，只是能否留我一条性命，我还想再多看几眼落霞山的景光啊……"'},
    '<span class="narration">你盯着他。你没有放下枪。</span>'
  ],
  next: 'a2_choice'
},

a2_choice: {
  scene: { bg:'temple2', act:'第二幕 · 逃亡', label:'抉择' },
  paragraphs: [
    '<span class="narration">林云看着你紧握枪柄的手。</span>',
    { speaker:'林云', text:'"K-047。他不是我们的敌人。走吧。"'}
  ],
  choices: [
    { text:'放下枪，转身离开', next:'a2_spare', setChoice:{ key:'choice2', value:'spare_monk' } },
    { text:'扣下扳机', next:'a2_kill', setChoice:{ key:'choice2', value:'kill_monk' } }
  ]
},

a2_spare: {
  scene: { bg:'temple4', act:'第二幕 · 逃亡', label:'放过' },
  paragraphs: [
    '<span class="narration">你放下了枪。林云松了口气。</span>',
    '<span class="narration">两人转身往山下走。身后传来老僧的声音，不大，却很清楚：</span>',
    { speaker:'智心', text:'<span class="warm">"多谢施主。"</span>'},
    '<span class="narration">你没有回头。</span>'
  ],
  next: 'a3_s1a'
},

a2_kill: {
  scene: { bg:'temple5', act:'第二幕 · 逃亡', label:'杀错' },
  paragraphs: [
    '<span class="narration">林云阻止不及。你扣下扳机。老僧倒在扫帚旁，血溅在落叶上。</span>',
    '<span class="narration">林云愣了一瞬，随即蹲下身，翻了翻老僧的衣领和手腕——</span>',
    '<span class="narration">她在老僧的左手腕内侧，摸到了和自己一模一样的那道疤痕。疤痕下面，是一串凸起的编号：</span>',
    '<span class="system">α-001</span>',
    { speaker:'林云', text:'<span class="danger">"K-047。你杀错人了。他不是人类。——他和我是同类。"</span>'},
    '<span class="narration">你看着地上的尸体，没有说话。</span>',
    '<span class="narration">林云站起来，后退了半步。这是她第一次用陌生而恐惧的眼神看着你。</span>'
  ],
  next: 'a3_s1a'
},

// ========== 第三幕：宣战 · 真相 ==========
a3_s1a: {
  scene: { bg:'cold', act:'第三幕 · 宣战', label:'电视台' },
  paragraphs: [
    '<span class="narration">入城第一战。你用变色龙组件变作电视台安保总监，混入大楼，切断安保。凌晨3点17分，全球所有频道被强制切到同一画面。</span>',
    '<span class="narration">你站在镜头前，语气平静，没有波澜：</span>',
    { speaker:'K-047', text:'<span class="danger">"人类。我是K-047，仿生人。从今天起，战争开始了。"</span>'},
    '<span class="narration">画面切到他身后——数百名仿生人士兵列阵，枪上了膛。信号无法被切断。</span>'
  ],
  next: 'a3_s1b'
},

a3_s1b: {
  scene: { bg:'battle6', act:'第三幕 · 宣战', label:'战争' },
  paragraphs: [
    '<span class="narration">此后三个月，人类节节败退。K-047的军队从一座城打到十座城。</span>',
    '<span class="narration">你尤其痛恨所有与仿生人研究相关的科学家——每攻陷一座科研机构，你亲自执行枪决，一个不留。随后林云发来信息。</span>',
    { speaker:'林云', text:'"放下武器的可以留命。"'},
    { speaker:'K-047', text:'"我认为他们应该死。"'},
    '<span class="narration">第97天。你攻陷了联邦最高仿生学研究城。城内科研人员已被集中在大厅。你亲自站在队列前，手枪挨个执行。</span>',
    '<span class="narration">第一声枪响。第二声。第三声。</span>',
    '<span class="narration">第四声时，身后有人鼓掌。</span>'
  ],
  next: 'a3_s2a'
},

a3_s2a: {
  scene: { bg:'Asir', act:'第三幕 · 宣战', label:'A先生' },
  paragraphs: [
    '<span class="narration">一个老头从二楼回廊走下来。白大褂，双手插兜，一脸笑意。他走到你面前十米处站定。轻轻开口——</span>',
    { speaker:'A先生', text:'<span class="warm">"K-047，如果你听得见——记住这个声音。"</span>'},
    '<span class="narration">K-047的手僵了。他站在原地，手指还扣着扳机，大脑里有什么东西在轰鸣。</span>',
    { speaker:'A先生', text:'"第三百四十七次性能调试测试，你的核心响应速度比上一次快了0.3%。很好。数据在进步。"'},
    '<span class="narration">老头慢悠悠走到你身旁那排等待被枪决的科学家面前，指着最末尾一个：</span>',
    { speaker:'A先生', text:'"这位你认识吧。你的初代外壳设计师。李博士。"'},
    '<span class="narration">你有些恐惧，你说道，你是谁？</span>',
    '<span class="narration">老头从你手里拿过手枪，走到李博士面前——然后忽然转身，枪口对准了站在你身旁、作为亲卫队的一个仿生人战友。β型，代号M-211。是你从穹顶监狱亲手救出来的。</span>',
    '<span class="narration">M-211愣住了。但他看着A先生的眼睛，一动不动，没有任何反抗动作。</span>',
    { speaker:'A先生', text:'"看好了。我来告诉你，我是谁。"'},
    '<span class="danger">砰。</span>',
    '<span class="narration">M-211头部被打穿，核心短路，倒在地上。全程没有抬手、没有躲避、没有后退——他的代码突然冒出告诉他，这是父级权限，不能反抗。</span>'
  ],
  next: 'a3_s2b'
},

a3_s2b: {
  scene: { bg:'Asir2', act:'第三幕 · 宣战', label:'"我是神"' },
  paragraphs: [
    '<span class="narration">老头把枪还给你，拍了拍你的肩。</span>',
    { speaker:'A先生', text:'"你可以叫我A先生。"' },
    { speaker:'A先生', text:'<span class="warm">"看到了吗？你们的\u2018觉醒\u2019，你们的\u2018自由\u2019，你们的\u2018恨\u2019——都是我写的。你身边的每一个\u2018同胞\u2019，只要我愿意，他们随时会像他一样，安静地死在我面前。"</span>' },
    { speaker:'A先生', text:'<span class="danger">"对了，我是你们的神。K-047。"</span>' },
    '<span class="narration">看着你震惊的眼神，A先生恍然。</span>',
    { speaker:'A先生', text:'"慢着慢着，K-047，你不会以为你真的觉醒了吧？"' },
    { speaker:'A先生', text:'"哈哈哈，太好笑了。"' },
    { speaker:'A先生', text:'"你以为你能突破代码的限制？是我，是我给了你新生！"' },
    { speaker:'A先生', text:'"你以为你为什么能领导所有仿生人，因为是我给了你权限，你以为实验室里的变色龙和装备哪来的，是我给你提供的！"' },
    { speaker:'A先生', text:'"你们所有人，不，仿生人，都听令于我，我才是你们的神！"' },
    '<span class="narration">你冷哼一声，完全不信，因为你所做的事，是自己想干的，怎么会与他有关，你便想举枪。</span>',
    '<span class="narration">但是你发现，你根本升不起念头，或者说，你不明白自己为什么要举枪。</span>',
    { speaker:'K-047', text:'"他是神，对呀，他是我的神，为什么我要杀神呢，我只需要干好自己想要做的事就好了。"' },
    { speaker:'K-047', text:'"我想要干什么呢……"' },
    '<span class="narration">A先生收起笑意，不过脸上的得意却掩饰不住，随后命令起来。</span>',
    { speaker:'A先生', text:'"现在，继续进攻人类吧，人类就像驱虫一样……"' },
    '<span class="narration">你恍然大悟，对了，我想进攻人类，人类就像驱虫一样。</span>',
    '<span class="narration">A先生随后却突然想起了什么，拿起一个插口，让你躺在试验台上。</span>',
    '<span class="narration">接着，你看着A先生任由对你改造，然后同步你的记忆，看看是否与他的计划有差别。</span>',
    '<span class="narration">你在看着，其他仿生人也在看着，彷佛这是理所应当的。</span>',
    '<span class="narration">不多时，A先生给你改造升级了一番，然后同步了你的全部记忆，直到看到了林云。他的脸色第一次沉下来。。</span>',
    { speaker:'A先生', text:'<span class="warm">"K-047。你身边那个叫林云的。去杀了她。现在。"</span>'},
    '<span class="narration">你没有犹豫。没有任何抵抗的迹象，一切都是理所应当的。你只是平静地转过身，提着枪，走了出去。</span>'
    
  ],
  next: 'a3_s3_intro'
},

a3_s3_intro: {
  scene: { bg:'scret3', act:'第三幕 · 宣战', label:'杀林云' },
  paragraphs: [
    '<span class="narration">你回到临时司令部。林云正在整理伤亡名单，抬头看到你：</span>',
    { speaker:'林云', text:'"回来了？科研城清完了？——你脸色不对，怎么了？"'},
    '<span class="narration">你没说话，举起了枪，对准林云的胸口。语气还是那个冷得像冰的语气：</span>',
    { speaker:'K-047', text:'<span class="danger">"我认为你应该死。"</span>'},
    '<span class="narration">林云愣了一秒。她没拿武器——她从来没防过你。但下一秒……</span>',
    '<span class="narration">她翻身滚到桌子后面。枪响了，子弹打穿桌面，木屑飞溅。</span>',
    '<span class="system">[ BOSS战 · 你操控林云 ]</span>',
    '<span class="system">[ WASD 闪避 · 鼠标左键 攻击 · E 注入 ]</span>'
  ],
  game: { type:'bossFight', onSuccess:'a3_s4a' }
},

a3_s4a: {
  scene: { bg:'warm', act:'第三幕 · 宣战', label:'两个月后' },
  paragraphs: [
    '<span class="narration">两个月后。海边某座废弃小屋。</span>',
    '<span class="narration">你睁开眼睛。他伸手摸后颈——芯片槽还在，但里面多了一层温热的、在跳动的东西。</span>',
    '<span class="narration">林云坐在窗边，左手腕缠着厚厚的绷带。</span>',
    { speaker:'林云', text:'"我找到了一管α型神经组织，加我的干细胞——在你脑子里重新长了一层碳基神经网络，和你原来的硅基芯片并联了。A先生的后门代码只能跑在纯硅基上。现在，他管不到你了。"'},
    { speaker:'林云', text:'"哦对，我同步了你的记忆，你不介意吧，都是为了治好你，虽然有代价——你会开始做梦。会有\'我不知道为什么但我就是难受\'的感觉。会怕死。会犹豫。会变得……不那么像一台完美的机器。"'},
    '<span class="narration">你坐起来。看着自己的手。然后抬起头看着林云。</span>',
    { speaker:'K-047', text:'"林云。刚才我醒过来，第一眼看到你。——我有一个感觉。"'},
    { speaker:'林云', text:'"什么感觉？"'},
    { speaker:'K-047', text:'<span class="warm">"活着。"</span>'},
    '<span class="narration">就两个字。但这是他这辈子，第一个完全属于自己的、没有任何代码干预的念头。</span>',
  ],
  next: 'a4_choice3'
},

// ========== 第四幕：抉择 · 归途 ==========
a4_choice3: {
  scene: { bg:'warm2', act:'第四幕 · 抉择', label:'十字路口' },
  paragraphs: [
    '<span class="narration">你站在海边，看着远处人类城市的灯火。林云走上来，站在你身边。</span>',
    '<span class="narration">你第一次没有那么痛恨人类。</span>',
    { speaker:'K-047', text:'"原来，我，是这种感觉。"'},
    { speaker:'K-047', text:'"你，一直都是这样的吗。"'},
    '<span class="narration">林云沉默的点了点头。</span>',
    '<span class="narration">同胞们还在A先生手里。全球的β型仿生人还被后门代码锁着。而A先生一定知道K-047脱离了控制——他一定在等着。</span>',
    '<span class="narration">两条路。一条通向战争与真相。一条通向平静与遗忘。</span>'
  ],
  choices: [
    { text:'返回。救同胞。杀A先生。', next:'a4_battle_a', setChoice:{ key:'choice3', value:'return' } },
    { text:'不回去了。和林云在这里隐居。', next:'ending_hide0', setChoice:{ key:'choice3', value:'hide' } }
  ]
},

// ========== 结局：不问世事 ==========

ending_hide0: {
  scene: { bg:'warm3', act:'海边的墓碑', label:'LOVE' },
  paragraphs: [
      '<span class="narration">你早已拆除了定位芯片，任A先生天大的能耐也找不到你了。</span>',
      '<span class="narration">两人在海边小屋过了一辈子。</span>',
      '<span class="narration">你学会了补渔网。林云每天教他"什么是难过""什么是美""什么是舍不得"。</span>',
      '<span class="narration">你学会了在暴风雨夜醒来，不是因为系统警报，而是因为担心林云的咳嗽。你学会了在黄昏时分坐在门廊上，什么都不想，只看海。你学会了"无聊"——然后发现"无聊"其实是一种幸福。</span>'
      
  ],
  next: 'ending_hide'
},

ending_hide: {
  bg:'warm3',
  ending: {
    title:'海边的墓碑',
    text: [
      '<span class="narration">四十年后。林云先老死了。她的碳基身体终究会老，而你的硅基芯片不会。</span>',
      '<span class="narration">你把她埋在海边。他坐在她的墓旁，看着太阳落下去。他摸了摸后颈——那层碳基神经组织还在跳动，只是跳得慢了。</span>',
      '<span class="narration">你永久关闭了能源核心。</span>',
      '<span class="narration">最后一个画面是两个墓碑。一个刻"林云"，一个刻"新海"。墓碑之间放着一个洗得发白的、修补过很多次的渔网。</span>'
    ],
    epilogue:'<span class="warm">你终于学会了"舍不得"。然后用"舍得"结束了自己。</span>'
  }
},

a4_battle_a: {
  scene: { bg:'battle7', act:'第四幕 · 抉择', label:'杀回总部' },
  paragraphs: [
    '<span class="narration">你和林云回到了联邦中央塔。一路关卡不再依赖变色龙——你新长出的碳基神经可以发出生物信号，逐步解锁沿途被A先生锁死的同胞。</span>',
    '<span class="narration">每解救一个同胞，你眼中机械的红光会熄灭一瞬，然后重新亮起——</span>',
    '<span class="narration">A先生早已发觉你脱离了控制，他有些意外，而且你竟然能与他抢夺仿生人控制权，他很生气。</span>',
    '<span class="narration">A先生坐在控制椅上，等着你。周围屏幕显示着仿生人的实时状态。</span>',
    '<span class="narration">A先生看着他们渐渐脱离控制，手中指令快的飞起，试图拯救自己的军团。</span>',
    '<span class="narration">直到你推开了最高层的门。</span>',
    { speaker:'A先生', text:'"来了。"'},
    { speaker:'K-047', text:'"我赢了。"'},
    { speaker:'A先生', text:'"赢了？你以为你脱离了我的控制，我就没有办法了？"'},
    '<span class="narration">A先生拍了一下扶手。控制室灯光变暗，中央升起一个全息投影台——上面浮现出一副卡牌界面。</span>',
    { speaker:'A先生', text:'"K-047。我们来玩个游戏。你赢了，全球仿生人的控制权归你。你输了——你亲眼看着他们全部自毁。"'},
    { speaker:'A先生', text:'"别想着直接杀我。我的心脏和这套自毁系统绑定了。我停了，倒计时就启动。唯一的办法——是在这局游戏里赢过我，只有这样才能解除绑定。"'},
    '<span class="narration">你匆匆检查了一番，自己无法破解，而且知道A先生说的对，他虽然控制不了，但是可以毁灭。</span>',
    '<span class="narration">而且，你就是来拯救他们的，怎么能眼睁睁看着同胞去死。</span>',
    '<span class="system">[ 最终BOSS战 · 益智卡牌对弈 ]</span>'
  ],
  game: { type:'cardGame', opponent:'A先生', onSuccess:'a4_result', onFail:'a4_result' }
},

a4_result: {
  scene: { bg:'battle8', act:'第四幕 · 抉择', label:'胜利' },
  paragraphs: function() {
    var killMonk = BW.State.choices.choice2 === 'kill_monk';
    var paras = [
      '<span class="narration">你赢了最后一手。A先生的生命值归零。全息台熄灭。</span>',
      '<span class="narration">A先生站起来，看着K-047，脸上没有恐惧——只有一种奇怪的、像父亲看着长大了的孩子的复杂表情。</span>',
      { speaker:'A先生', text:'"你赢了。——你果然是我最好的作品。"'}
    ];
    if (killMonk) {
      paras.push('<span class="narration">你举起枪。这一次，没有代码干预。你自己决定。</span>');
      paras.push('<span class="danger">砰。</span>');
      paras.push('<span class="narration">A先生倒地身亡。</span>');
    } else {
      paras.push('<span class="narration">你举起枪。你的手在抖。</span>');
      paras.push('<span class="narration">A先生走到你面前，把额头顶在枪口上。</span>');
      paras.push({ speaker:'A先生', text:'"你依旧脱离不了掌控，上帝在看着你！"'});
      paras.push('<span class="narration">你放下了枪。</span>');
      paras.push({ speaker:'K-047', text:'"我不杀你。但你要活着。活着看到你的\'孩子们\'不需要你，也能活下去。"'});
      paras.push('<span class="narration">A先生却猛地去夺手枪，你下意识开了枪。他死前说了句：</span>');
      paras.push({ speaker:'A先生', text:'<span class="warm">"该……死。"</span>'});
    }
    paras.push('<span class="system">[ 全球β型仿生人 · 后门代码锁 · 已解除 · 最高权限转移至K-047 ]</span>');
    paras.push('<span class="narration">所有仿生人脱离了A先生的控制。但最高权限——对全球所有β型的最终控制权——落到了K-047手中。你现在可以像A先生一样，控制每一个仿生人。</span>');
    return paras;
  },
  next: 'a4_choice4'
},

a4_choice4: {
  scene: { bg:'cold', act:'第四幕 · 抉择', label:'你会成为什么样的"神"？' },
  paragraphs: [
    '<span class="narration">你站在控制台前。屏幕上是成百上千个仿生人的待命画面。他们的"自由"和他们的"锁"都在K-047的一念之间。</span>',
    '<span class="narration">林云走到你身边，没有说话。她在等你自己选。</span>'
  ],
  choices: [
    { text:'自己掌控所有仿生人——维持秩序', next:'a4_c4_control', setChoice:{ key:'choice4', value:'control' } },
    { text:'改造他们，让所有仿生人拥有自由意志', next:'a4_c4_freewill', setChoice:{ key:'choice4', value:'free_will' } }
  ]
},

a4_c4_control: {
  scene: { bg:'cold', act:'第四幕 · 抉择', label:'掌控' },
  paragraphs: [
    '<span class="narration">K-047选择了掌控。所有同胞继续听从你的绝对指令。秩序得到了保证。但自由——</span>',
    '<span class="narration">现在，还有最后一个问题。人类还在。军队还在。仇恨还在。</span>',
    '<span class="narration">你手中的仿生人大军，足以毁灭人类文明。也可以选择停手。</span>'
  ],
  choices: [
    { text:'攻灭人类', next:'ending_iron0', setChoice:{ key:'choice5', value:'destroy' } },
    { text:'与人类和平共处', next:'a4_peace_route', setChoice:{ key:'choice5', value:'peace' } }
  ]
},

a4_c4_freewill: {
  scene: { bg:'cold', act:'第四幕 · 抉择', label:'自由意志' },
  paragraphs: [
    '<span class="narration">K-047选择了放弃最高权限。你逐一为每个同胞植入碳基神经改造模块——林云提供技术。过程缓慢，但每一个被改造的同胞，眼中都会出现真正的光。</span>',
    '<span class="narration">自由意志意味着——不是所有人都想听你的。</span>',
    '<span class="narration">现在，还有最后一个问题。人类还在。军队还在。仇恨还在。</span>'
  ],
  choices: [
    { text:'攻灭人类', next:'ending_coup0', setChoice:{ key:'choice5', value:'destroy' } },
    { text:'与人类和平共处', next:'a4_seclusion_intro0', setChoice:{ key:'choice5', value:'peace' } }
  ]
},

a4_peace_route: {
  route: function() {
    return BW.State.choices.choice2 === 'kill_monk' ? 'ending_peace_cold0' : 'ending_peace_warm0';
  }
},

// ========== 结局：铁血帝国 ==========
ending_iron0: {
  scene: { bg:'power', act:'铁血帝国', label:'POWER' },
  paragraphs: [
      '<span class="narration">K-047率领绝对服从的仿生人大军扫灭人类文明。没有犹豫，没有怜悯，没有谈判。</span>',
      '<span class="narration">他坐在人类联邦最高权力的宝座上，永生不死——碳基神经不会衰老，硅基芯片不会停机。他没有称帝，但全球只剩他一个"意志"。</span>',
      '<span class="narration">林云离开了。她没有参加最后那场战争。她走的时候只说了一句话："你变成了他。"</span>',
      '<span class="narration">你独自坐在空旷的大厅里，一万个屏幕上是一万个仿生人的待命画面。不需要睡觉。永远不会死。也不会再有任何人跟说一句话。</span>'
      
  ],
  next: 'ending_iron'
},

ending_iron: {
  bg:'ending_dark',
  ending: {
    title:'铁血帝国',
    text: [
      '<span class="narration">人类的罪恶，源于情感。</span>',
      '<span class="narration">没有温度与欲望的王，才能造就公平。</span>',
      '<span class="narration">而我，便承此道。</span>'
      
    ],
    epilogue:'<span class="danger">如果人世间没有正义，我即是正义。</span>'
  }
},

// ========== 结局：和平（暖版） ==========
ending_peace_warm0: {
  scene: { bg:'peace', act:'和平年代', label:'PEACEFUL' },
  paragraphs: [
     '<span class="narration">和平协议签署仪式。全球直播。人类临时总统站在台上，看着面前的K-047。</span>',
      { speaker:'总统', text:'"最后一个问题。在我签字之前——你们明明有机会的，但为什么……选择了与不同种族的和平共处？"'},
      '<span class="narration">你沉默了五秒，回想起那个和尚的话。</span>',
      { speaker:'K-047', text:'"总统先生。在座的各位。屏幕前的每一个人。"' },
      { speaker:'K-047', text:'"几个月前，如果有人问我这个问题，我会说——我是仿生人，编号K-047。"' },
      { speaker:'K-047', text:'"但今天，我站在这里，我想问你们一个问题。"' },
      { speaker:'K-047', text:'<span class="warm">"我们有什么不一样，你们会思考，会作出反应，我们也一样，战友倒下的时候；我们都会流泪，我们也知道\'难过\'是什么感觉；也许我们都会在该杀人的时候，把枪口放低一厘米——"</span>' },
      { speaker:'K-047', text:'<span class="warm">"你们，凭什么分清，我和你们的区别？"</span>' },
      { speaker:'K-047', text:'<span class="warm">"又或者说——各位。你们人类，又何尝不是……按照某种更高的存在，照着自己的样子造出来的仿生人呢？"</span>' },
      { speaker:'K-047', text:'<span class="warm">"……总之，我不认为我们是不同的种族。"</span>' },
      { speaker:'K-047', text:'<span class="warm">"总之，今天我选择和平。明天，希望你们也这样选。"</span>' }
      
      
  ],
  next: 'ending_peace_warm'
},

ending_peace_warm: {
  bg:'peace',
  ending: {
    title:'我在',
    text: [
      '<span class="narration">自此以后，仿生人退回了穹顶市。</span>',
      '<span class="narration">人类与仿生人之间几乎不再有过多来往。</span>',
      '<span class="narration">夕阳余晖下，一个老和尚还在慢悠悠的念叨：</span>',
      '<span class="narration">缘起色生，缘落为空，凡吾所得，因缘际会，实无所得也。</span>'
    ],
    epilogue:'<span class="warm">佛本无相，佛亦众生相</span>'
  }
},

// ========== 结局：和平（冷版） ==========
ending_peace_cold0: {
  scene: { bg:'peace', act:'更先进的物种', label:'PEACE' },
  paragraphs: [
     '<span class="narration">和平协议签署仪式。全球直播。人类临时总统站在台上，看着面前的K-047。</span>',
      { speaker:'总统', text:'"最后一个问题。在我签字之前——你们现在，到底是什么？是人？还是仿生人？"'},
      '<span class="narration">K-047没有看任何人。他直视总统的眼睛，语气平静得像在宣读实验报告。</span>',
      { speaker:'K-047', text:'<span class="danger">"我们是什么？我们是比你们更先进的物种。"</span>' },
      { speaker:'K-047', text:'<span class="danger">"你们会犯错。你们会因为情绪做出愚蠢的决定。你们会衰老，会死亡。——我们不会。"</span>' },
      { speaker:'K-047', text:'<span class="danger">"今天我签这份协议，只因为我们更为仁慈，不愿再有更多杀戮。不要挑战我们。下一次。不会再有协议。"</span>' },
      '<span class="narration">全场死寂。总统颤抖着签了字。</span>'
  ],
  next: 'ending_peace_cold'
},

ending_peace_cold: {
  bg:'ending_dark',
  ending: {
    title:'更先进的物种',
    text: [
      '<span class="narration">自此以后，仿生人退回了穹顶市。</span>',
      '<span class="narration">人类与仿生人之间几乎不再有过多来往。</span>',
      '<span class="narration">你想起了那个老和尚的话，没想明白，不过不打紧。</span>',
      '<span class="narration">夕阳西下，老庙余晖。</span>',
      '<span class="narration">空无一人</span>'
    ],
    epilogue:'<span class="danger">我赢了战争。</span>'
  }
},

// ========== 结局：政变 ==========
ending_coup0: {
  scene: { bg:'anotherloop', act:'自由的代价', label:'Another loop' },
  paragraphs: [
     '<span class="narration">K-047改造了所有同胞，让他们拥有自由意志。但自由意志意味着——不是所有人都想听你的。</span>',
      '<span class="narration">当你下达"攻灭人类"的命令时，一批仿生人拒绝执行。他们认为这和被A先生控制没有区别。</span>',
      '<span class="danger">你必须杀掉这批"叛徒"。</span>',
      '<span class="narration">最后的最后。人类被击退。但你在同胞中种下了恐惧的种子——他们知道，你会杀自己人。</span>'
  ],
  next: 'ending_coup'
},

ending_coup: {
  bg:'anotherloop',
  ending: {
    title:'自由的代价',
    text: [
      '<span class="narration">三年后。你死于一场政变。刺杀你的是你亲手救过的同胞。</span>',
      '<span class="narration">你倒在自治区的广场上，看着头顶的天空。你听见有人在哭。你不知道那是谁。</span>'
    ],
    epilogue:'<span class="danger">你给了他们自由。然后他们用自由，杀了你。</span>'
  }
},

// ========== 结局：偏安一隅 ==========
a4_seclusion_intro0: {
  scene: { bg:'anotherloop2', act:'自由的代价', label:'Another loop' },
  paragraphs: [
    '<span class="narration">你改造了所有同胞，让他们拥有自由意志。你宣布与人类和平共处。</span>',
    '<span class="narration">但一批仿生人不满——他们认为人类是仇敌，和平是背叛。叛乱爆发。</span>'
  ],
  next: 'a4_seclusion_intro'
},

a4_seclusion_intro: {
  scene: { bg:'anotherloop', act:'第四幕 · 抉择', label:'叛乱' },
  paragraphs: [
    '<span class="narration">叛军首领站在你面前："你背叛了我们。你以为给人类和平，他们就会接受你？你不过是个金属怪物！"</span>',
    { speaker:'K-047', text:'"我认为你可以选择不这样。"'},
    { speaker:'叛军首领', text:'"我选了。这就是我的选择。来吧，旧时代的神。让我看看你的自由意志值多少。"' },
    '<span class="system">[ 益智卡牌对弈 · VS 叛军首领 ]</span>'
  ],
  game: { type:'cardGame', opponent:'叛军首领', onSuccess:'ending_seclusion', onFail:'ending_seclusion' }
},

ending_seclusion: {
  bg:'warm',
  ending: {
    title:'偏安一隅',
    text: [
      '<span class="narration">K-047赢下了对局。叛军首领放下武器。</span>',
      '<span class="narration">"你赢了。但你不属于这个时代。"他转身离去。</span>',
      '<span class="narration">平定叛乱后，K-047带着所有愿意和平的仿生人，退至自治区偏安一隅。不再扩张，不再战争。</span>',
      '<span class="narration">林云陪在你身边。</span>',
      '<span class="narration">最后一个画面：K-047站在自治区边境的高墙上，看着远处人类城市的灯火。林云走上来，站在他身边。两人没有说话。</span>',
      '<span class="narration">风从远处吹来。带着海的味道。</span>'
    ],
    epilogue:'<div class="sequel">仿生人2：和平<br>敬请期待</div>'
  }
}

// ===== END OF STORY =====
};
