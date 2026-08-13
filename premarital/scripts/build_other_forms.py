# -*- coding: utf-8 -*-
"""Build remaining form banks (hand-structured from blank markdown templates)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "forms"


def dump(form_id: str, title: str, chapters: list, scale=None, choice=None):
    bank = {
        "id": form_id,
        "title": title,
        "version": 1,
        "chapters": chapters,
    }
    if scale:
        bank["scale"] = scale
    if choice:
        bank["choice"] = choice
    path = OUT / f"{form_id}.json"
    path.write_text(json.dumps(bank, ensure_ascii=False, indent=2), encoding="utf-8")
    n = sum(len(c["items"]) for c in chapters)
    print(form_id, "chapters", len(chapters), "items", n)


def item(cid, kind, n, prompt, **extra):
    d = {"id": f"{cid}_{kind[0]}{n}", "type": kind, "prompt": prompt}
    d.update(extra)
    return d


def build_intake():
    ch = []
    # basic
    cid = "base"
    items = []
    opens = [
        "出生日期（年/月/日）",
        "年龄",
        "性别",
        "国籍/种族",
        "出生地（本身）",
        "父亲出生地",
        "母亲出生地",
        "出生序别 / 家庭树说明",
        "目前婚姻状况说明",
        "若有儿女：男孩/女孩年龄",
        "宗教成长环境",
        "目前所在教会",
        "教育程度与最高学位",
        "职业训练（年）",
        "已就职年数与现职",
        "父亲职业与退休情况",
        "母亲工作情况与你的感受",
        "孩童时家庭生活感受",
        "父母目前婚姻状况",
        "父母婚姻幸福程度",
        "18–21 岁异性交往情况",
        "恋爱经历与旧情人联络/情感/性行为情况（可简述）",
        "与父母关系（孩童/青年/目前）",
        "认识意中人多久；正式交往多久",
        "目前关系阶段与预定婚期",
        "是否曾订婚/中断关系/因故分离",
        "彼此信任程度",
        "婚后居住安排",
        "双方家长态度",
        "与准姻亲关系",
        "家庭预算与收支/供养他人",
        "家务分工期待",
        "亲密表达频率与满意度",
        "性经历相关（按题目如实）",
        "期望何时生育、孩子数量、妻子是否继续工作",
        "性知识来源与婚后性关系期待",
        "冲突处理方式",
        "对婚姻幸福的把握",
    ]
    for i, p in enumerate(opens, 1):
        items.append(item(cid, "open", i, p))
    ch.append({"id": cid, "title": "约谈问卷", "part": "main", "items": items})
    dump("intake", "交友/婚前约谈问卷", ch)


def build_expectations():
    ch = []
    cid = "exp"
    opens = [
        "对婚前辅导课程的期待",
        "对二人关系的期待",
        "对自己有什么期待？",
        "请你为“婚姻”下一个定义",
        "你对婚姻有什么期待和顾虑？",
        "列出五点：现今适合结婚的理由",
        "列出七点：要与对方结婚的理由",
    ]
    items = [item(cid, "open", i, p) for i, p in enumerate(opens, 1)]
    ch.append({"id": cid, "title": "期待问卷", "part": "main", "items": items})

    cid = "bible"
    opens = [
        "由创 2:24；太 19:4–6 归纳神对婚姻所立的法则",
        "何谓离开？包括哪些层面？",
        "哪一层面离开对你最难？为什么？",
        "为什么要丈夫离开父母与妻子连合？",
        "婚姻的终极目标为何？",
        "夫妻在哪几方面需要合一？",
        "箴 2:17；玛 2:14：夫妻关系属什么性质？",
        "现代婚姻最大威胁是什么？如何避免？",
    ]
    items = [item(cid, "open", i, p) for i, p in enumerate(opens, 1)]
    ch.append({"id": cid, "title": "圣经婚姻观讨论提纲", "part": "main", "items": items})
    dump("expectations", "期待问卷 + 婚姻观提纲", ch)


def build_family():
    ch = []
    cid = "self"
    opens = [
        "你是怎样的一个人？（具体详细）",
        "三个优点",
        "三个令人难以忍受的缺点/特质（伴侣常说的）",
    ]
    ch.append({"id": cid, "title": "一、了解自己", "part": "main", "items": [item(cid, "open", i, p) for i, p in enumerate(opens, 1)]})

    cid = "parents"
    opens = [
        "欣赏父亲的（至少三点）",
        "欣赏母亲的（至少三点）",
        "不欣赏父亲的（至少三点）",
        "不欣赏母亲的（至少三点）",
        "与父亲关系如何？有何期待？",
        "与母亲关系如何？有何期待？",
    ]
    ch.append({"id": cid, "title": "二、了解父母", "part": "main", "items": [item(cid, "open", i, p) for i, p in enumerate(opens, 1)]})

    cid = "origin"
    opens = [
        "成长中重大事件及影响/感受",
        "原生家庭对你的影响（行为模式、人际等）",
        "原生家庭中多数决定谁做？你的感觉？",
        "父母如何处理冲突？",
        "与伴侣冲突时你的方式更像父还是母？想法？",
        "将来婚姻中希望延续/调整的品质与气氛？",
    ]
    ch.append({"id": cid, "title": "三、了解原生家庭与反省", "part": "main", "items": [item(cid, "open", i, p) for i, p in enumerate(opens, 1)]})

    cid = "pray"
    opens = [
        "认同性悔改/砍断相关记录（可摘要）",
        "为将来家庭的祷告记录",
    ]
    ch.append({"id": cid, "title": "四、祷告记录（可选）", "part": "main", "items": [item(cid, "open", i, p) for i, p in enumerate(opens, 1)]})
    dump("family", "原生家庭", ch)


def build_knowyou():
    ch = []
    cid = "ky"
    opens = [
        "对方优点（至少三项）",
        "对方缺点（至少三项）",
        "过去一年最成功/美好的沟通事件",
        "过去一年彼此伤害/不愉快事件",
        "未说出口/说不清却希望对方明白的事",
        "有些事为什么不说出来？",
        "对方生气时你通常如何回应？",
        "目前处理冲突的方式与原因",
        "对沟通与相处的期待",
        "读《婚姻美满的秘诀》后希望做的调整",
        "其他想补充的知己知彼内容",
    ]
    ch.append({"id": cid, "title": "知己知彼与沟通", "part": "main", "items": [item(cid, "open", i, p) for i, p in enumerate(opens, 1)]})
    dump("knowyou", "知己知彼与沟通", ch)


def build_roles():
    scale = {
        "min": 1,
        "max": 5,
        "labels": ["极为同意", "颇为同意", "不肯定", "颇不同意", "极不同意"],
    }
    prompts = [
        "丈夫乃一家之主。",
        "妻子不应出外工作。",
        "丈夫应经常帮忙做清洗碗碟的工作。",
        "妻子对孩子有更大责任。",
        "妻子赚来的钱应归她自己所有。",
        "丈夫每星期最少应有一个晚上跟自己的朋友出去消遣一下。",
        "妻子赚来的钱应归她自己所有。（重复题，按表填写）",
        "丈夫的责任在外工作，太太的责任是照顾家务和儿女。",
        "处理钱财的最佳方法是两人收入共用不分彼此。",
        "结婚双方在地位上是平等的。",
        "面临僵局的时候，应该由丈夫作出最后的决定。",
        "每星期应该有一个晚上由丈夫看孩子，让妻子可以自由地做些她爱做的事。",
        "夫妇两人应该一起做休闲的活动。",
        "由妻子主动跟丈夫作爱没有什么不妥。",
        "夫妇两人应该一起订定家庭预算和处理财物的方法。",
        "未经对方同意，不应私自买三百元以上的物品。",
        "管教孩子是父亲的责任。",
        "有特别专长的妻子也应该有自己的事业。",
        "使家里清洁整齐是妻子的责任。",
        "做丈夫的应该每月有两次带妻子出去约会休闲。",
        "有关孩子的管教，母亲所负的责任跟父亲同样重要。",
        "倒垃圾应是丈夫的工作。",
        "母亲应该负责教导孩子有关价值观的问题。",
        "女性比男性更情绪化。",
        "应该容许孩子帮忙安排家庭活动。",
        "注重纪律的父母能让孩子有更好的发展。",
        "妻子应该常常顺从丈夫的决定。",
        "夫妇二人分别交友的范围应该由丈夫来决定。",
        "夫妇双方都不应与自己的父母住在同一居所。",
        "夫妇对一些事情意见不同时，孩子可以直接和他们沟通。",
    ]
    cid = "roles"
    items = [item(cid, "likert", i, p) for i, p in enumerate(prompts, 1)]
    ch = [{"id": cid, "title": "夫妻角色概念比对表", "part": "main", "items": items}]

    cid = "disc"
    opens = [
        "丈夫是“头”指什么？",
        "好丈夫（头）需要做哪些事？",
        "你能扮演好“头”的角色吗？",
        "你要如何爱妻子？（具体行动）",
        "何谓了解妻子？你如何实行？",
        "妻子角色是什么？（创 2:18）",
        "何谓顺服？意义？",
        "为什么要顺服？（经文）",
        "妻子顺服可能面对的困难？",
        "何谓尊重丈夫？你如何实行？",
    ]
    ch.append({"id": cid, "title": "角色讨论提纲", "part": "main", "items": [item(cid, "open", i, p) for i, p in enumerate(opens, 1)]})
    dump("roles", "夫妻角色概念比对", ch, scale=scale)


def build_sex():
    choice = {
        "options": [
            {"value": 1, "label": "同意"},
            {"value": 2, "label": "不同意"},
            {"value": 3, "label": "不确定"},
        ]
    }
    prompts = [
        "我认为性应该一直保留到结婚后才开始。",
        "男女交往时，身体的亲密度太快，会影响恋爱发展。",
        "基督徒弟兄和姐妹若身体亲密度太快或太高，就无法顺从圣灵的带领。",
        "二个基督徒男女在恋爱时，也可能发生性行为。",
        "多数女性月经来之前，情绪低落、不稳定。经期来时会发生头痛、腹痛等现象。",
        "女性即使取掉了子宫，仍然达到性高潮。",
        "女人如果在月经期间性交就不会怀孕。",
        "即使因为使用被感染性病的人使用过的马桶，也可能感染到性病。",
        "男性生殖器的大小长短，与性生活的满足和生殖能力有关系。",
        "女性到了更年期后，月经停止，就无法享受性生活。",
        "如果一个女人没有处女膜，正可以证明她不是处女。",
        "吃了避孕药后百分之百保证不怀孕。",
        "老年人不会有性的需要。",
        "两厢情愿的成人性行为是他们之间的私事。",
        "“性”本身是好的，是中性的。",
    ]
    cid = "sexq"
    items = []
    for i, p in enumerate(prompts, 1):
        items.append({"id": f"{cid}_c{i}", "type": "choice", "prompt": p, "options": choice["options"]})
    ch = [{"id": cid, "title": "性观念与性知识问卷", "part": "main", "items": items}]

    cid = "sexd"
    opens = [
        "关于婚姻性生活我还想进一步知道什么？",
        "有关将来婚姻性生活，我的焦虑是什么？我的期望又是什么？",
    ]
    ch.append({"id": cid, "title": "夫妻性生活问题讨论", "part": "main", "items": [item(cid, "open", i, p) for i, p in enumerate(opens, 1)]})
    dump("sex", "性观念与性知识", ch, choice=choice)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    build_intake()
    build_expectations()
    build_family()
    build_knowyou()
    build_roles()
    build_sex()
    print("done")


if __name__ == "__main__":
    main()
