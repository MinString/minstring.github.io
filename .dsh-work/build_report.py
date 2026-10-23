# -*- coding: utf-8 -*-
"""在保留原 docx 全部部件的前提下，重写 word/document.xml：
   - 语病/错别字修正后的正文
   - 按《思想汇报模板.docx》的格式要求排版
     标题：宋体三号加粗居中；副标题：宋体四号加粗居中
     正文：宋体小四，1.5 倍行距，两端对齐，首行缩进 2 字符
     落款（汇报人/日期）居右
"""
import zipfile, shutil, re, os, sys

SRC = "/home/minstring/THU/党员/思想汇报/思想汇报.docx"
OUT = sys.argv[1] if len(sys.argv) > 1 else "/run/media/minstring/DATA/minstring.github.io/.dsh-work/思想汇报.docx"

SONG = '<w:rFonts w:ascii="宋体" w:hAnsi="宋体" w:eastAsia="宋体" w:cs="宋体"/>'

def esc(t):
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def rpr(sz, bold=False):
    return ("<w:rPr>" + SONG + ("<w:b/><w:bCs/>" if bold else "") +
            '<w:sz w:val="%d"/><w:szCs w:val="%d"/></w:rPr>' % (sz, sz))

def para(text, sz=24, bold=False, jc="both", indent=False, spacing_after=0):
    ind = '<w:ind w:firstLineChars="200" w:firstLine="480"/>' if indent else ""
    p = ('<w:p><w:pPr>'
         '<w:widowControl w:val="0"/>'
         '<w:spacing w:before="0" w:after="%d" w:line="360" w:lineRule="auto"/>'
         '<w:snapToGrid w:val="0"/>'
         '%s'
         '<w:jc w:val="%s"/>'
         '%s'
         '%s'
         '</w:pPr>'
         % (spacing_after, ind, jc, rpr(sz, bold), ""))
    if text:
        p += '<w:r>%s<w:t xml:space="preserve">%s</w:t></w:r>' % (rpr(sz, bold), esc(text))
    p += "</w:p>"
    return p

TITLE = "思想汇报"
SUBTITLE = "——跨越时空对话有感"
SALUTE = "敬爱的党组织："

BODY = [
 "近期，我借助AI工具，结合毛泽东同志的生平和著作，尝试与这位伟大领袖展开几轮跨越时空的对话。对话之后，我对毛泽东同志的乐观精神、深邃洞见和务实作风有了更深的感触，也更加真切地体会到一名共产党员应当具备怎样的精神底色。",
 "此前，我对毛泽东同志的了解多来自课本、网络和他人的评价，缺乏系统的学习，认识比较浅薄，大体停留在实事求是、乐观、人民立场这些概念上。经过这次对话，我不仅加深了原有的认识，也对他有了更深的理解。我了解到，当他远离政治中心、处于人生低谷的时候，依然保有坚定的自信和顽强的毅力。这种自信和毅力，既源于他对自身道路的坚定信念，也源于他对革命大势的深刻洞察。这让我明白，一个人真正的精神力量，往往来自他对所从事事业的真诚信仰。",
 "我首先了解了毛泽东同志的人生沉浮。他在红四军党的七大上落选了前委书记，离开领导岗位到闽西指导地方工作。他虽然会因为自己认定的主张没有被采纳而难过，但并没有撂挑子不干，而是坚持一名党员的作风，到闽西就干闽西的事情。到了那里，他先做调查，摸清土地分配、人民生活、地方武装等情况，通过实践和调研推动当地工作开展。他不把个人得失看得太重，而是着眼长远，坚持工作，保持乐观。这一时期，他写下了《采桑子·重阳》，其中“战地黄花分外香”一句让我感触颇深。他忧虑革命前途，个人正处于低谷，却仍然坚守为国为民的初心，在地方工作中继续为革命作出贡献。",
 "毛泽东同志在闽西的经历给了我很大启发。首先，入党不只是口头上的、组织上的，更是思想上、行动上的。不认真学习党的理论，不真正扎根人民，就不能算一名合格的党员。毛泽东同志作为一名党员，在思想上坚定地认同马克思主义，把一名共产党员的务实与坚定落实到行动中。其次，一名党员的修养往往不在顺风顺水时显现，逆境中的表现最能检验党员的成色。顺境里表态容易，受挫时还能不能守住本分、继续做事，才是真正的考验。毛泽东同志在失去领导岗位后仍然坚持调查研究、指导地方工作，这种不因个人得失而动摇的定力，值得我认真学习。再次，要切实联系群众，从积极参加集体讨论、主动帮助身边同学做起，而不是把“为人民服务”停留在口号上。",
 "这段时间，我在学习上认真完成课程任务，主动阅读《中国共产党简史》，但也发现自己还存在以下不足：首先，时间规划不合理，有些任务一拖再拖，没能及时完成，事后又常常因为赶进度而草草了事；其次，学习效率不高，日常的繁杂事务占用了大量时间，零碎的时间又在刷手机中消磨掉了；再次，理论学习不够系统深入，阅读往往停留在“看过一遍”的层面，缺少思考和消化，也没有养成随手记录心得体会的习惯。这些不足看起来都是小事，但日积月累，就会影响学习的效果，也会影响自己思想上的成长。",
 "针对上述不足，我将采取以下改进措施：第一，制定系统的理论学习计划，坚持原原本本地学习马克思列宁主义、毛泽东思想、邓小平理论、“三个代表”重要思想、科学发展观、习近平新时代中国特色社会主义思想，既要利用整块时间系统研读，也要善于用好碎片时间；第二，坚持学用结合，把理论学习同专业学习、社会实践和身边同学的实际需求联系起来，定期反思自己是否做到了知行合一；第三，在集体事务中主动担当，从小事做起，遇到困难不回避，在实践中锤炼自己的责任意识和担当精神；第四，坚持定期总结，每个月对照党员标准检视一次自己的思想和行动，把不足逐项列出来、改过来，并主动向培养联系人和身边同学请教，请他们帮助监督。",
 "以上是我本季度的思想汇报，请党组织批评指正！",
]

CLOSE1 = "此致"
CLOSE2 = "敬礼！"
SIGN = "汇报人：王琪鑫"
DATE = "2026年10月19日"

body = []
body.append(para(TITLE, sz=32, bold=True, jc="center", spacing_after=60))
body.append(para(SUBTITLE, sz=28, bold=True, jc="center", spacing_after=180))
body.append(para(SALUTE, sz=24, jc="left"))
for t in BODY:
    body.append(para(t, indent=True))
body.append(para(CLOSE1, indent=True))
body.append(para(CLOSE2, jc="left"))
body.append(para(""))
body.append(para(SIGN, jc="right"))
body.append(para(DATE, jc="right"))

SECTPR = ('<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>'
          '<w:pgMar w:top="1440" w:right="1800" w:bottom="1440" w:left="1800" '
          'w:header="851" w:footer="992" w:gutter="0"/>'
          '<w:cols w:space="425" w:num="1"/>'
          '<w:docGrid w:type="lines" w:linePitch="312" w:charSpace="0"/></w:sectPr>')

z = zipfile.ZipFile(SRC)
doc = z.read("word/document.xml").decode("utf-8")
head = doc[:doc.index("<w:body>") + len("<w:body>")]
newdoc = head + "".join(body) + SECTPR + "</w:body></w:document>"

# 校验 XML 合法性
import xml.dom.minidom as md
md.parseString(newdoc.encode("utf-8"))

os.makedirs(os.path.dirname(OUT), exist_ok=True)
if os.path.exists(OUT):
    os.remove(OUT)
zin = zipfile.ZipFile(SRC, "r")
zout = zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED)
for item in zin.infolist():
    data = zin.read(item.filename)
    if item.filename == "word/document.xml":
        data = newdoc.encode("utf-8")
    zout.writestr(item, data)
zout.close()

# 统计字数
plain = "".join(BODY) + TITLE + SUBTITLE + SALUTE + CLOSE1 + CLOSE2 + SIGN + DATE
cjk = len(re.findall(r"[\u4e00-\u9fff]", plain))
nospace = len(re.sub(r"\s", "", plain))
print("OUT:", OUT, os.path.getsize(OUT), "bytes")
print("CJK:", cjk, " 非空白总字符:", nospace)
print("段落数:", len(body))
