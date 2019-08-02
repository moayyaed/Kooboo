import context from "@/common/context";
import { SelectedDomEventArgs } from "@/events/SelectedDomEvent";
import { createEditMenuItem } from "@/components/floatMenu/items/editMenu";
import { KoobooComment } from "@/kooboo/KoobooComment";

describe("editMenu", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("createEditMenuItem_update", () => {
    document.body.innerHTML = `
        <!--#kooboo--objecttype='menu'--nameorid='headerMenu'--boundary='259'-->
        <ul class="menu">
            <li class="className">
                <a href="/index">首页</a>
            </li>
        </ul>
        <!--#kooboo--end='true'--objecttype='menu'--boundary='259'-->
        `;

    let elementObject = createEditMenuItem();
    expect(elementObject.el.style.display).toEqual("");

    // 不能是body元素
    context.lastSelectedDomEventArgs = new SelectedDomEventArgs(document.body as HTMLElement);
    let comments = KoobooComment.getComments(document.body);
    elementObject.update(comments);
    expect(elementObject.el.style.display).toEqual("none");

    context.lastSelectedDomEventArgs = new SelectedDomEventArgs(document.body.children[0].children[0].children[0] as HTMLElement);
    comments = KoobooComment.getComments(document.body.children[0].children[0].children[0]);
    elementObject.update(comments);
    expect(elementObject.el.style.display).toEqual("block");
  });

  test("createEditMenuItem_update_noExistInMenu", () => {
    document.body.innerHTML = `
        <!--#kooboo--objecttype='contentrepeater'--nameorid='6a883ab8-435c-cd7c-9ac1-5473fd6f1788'--folderid='ffa232c4-ca49-9c07-8b43-fd30d5ec5e8b'--bindingvalue='List_Item'--boundary='171'-->
        <div class="widget widget-intro" kooboo-id="1-0">
            <article class="content" kooboo-id="1-0-1-1-1-1">
                <h2 kooboo-id="1-0-1-1-1-1-3">Mailaaaa</h2>
                <p kooboo-id="1-0-1-1-1-1-5">大数据与人工智能是未来主要研发方向。</p>
            </article>
        </div>
        <!--#kooboo--end=true--objecttype='contentrepeater'--boundary='171'-->
        `;

    let selectedElement = document.body.children[0].children[0].children[0] as HTMLElement;

    context.lastSelectedDomEventArgs = new SelectedDomEventArgs(selectedElement);

    let elementObject = createEditMenuItem();
    expect(elementObject.el.style.display).toEqual("");

    let comments = KoobooComment.getComments(document.body.children[0].children[0].children[0]);
    elementObject.update(comments);
    expect(elementObject.el.style.display).toEqual("none");
  });
});
