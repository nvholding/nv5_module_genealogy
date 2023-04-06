/**
 * 28.10.2022
 * V2: multi tree in a page
 */

class clsTreeJsV2 {

    //Dùng để chứa mọi instance của class này, mục đích cho trường hợp multi-tree trên 1 trang
    //mỗi tree có một instance, mảng này để truy ngược các phần tử trong tree được quản lý bởi instance nào
    //Từ một DOM bất kỳ, truy ngược đến gốc là class=cls_root_tree để, tìm ra data-tree-bind-selector=..., từ đó ra instance tương ứng trong all[] này
    //để lấy ra các setting, như api, ...
    static all = [];

    constructor() {

        clsTreeJsV2.all.push(this);
        console.log("clsTreeJsV2.constructor: ", clsTreeJsV2.all);
    }

    destroy() {
        console.log(" clsTreeJsV2.destroy");
        let i = clsTreeJsV2.all.indexOf(this);
        clsTreeJsV2.all.splice(i, 1);
    }

    static clearAllTreeInstance(){
        console.log(" Clear all Tree instance...");
        clsTreeJsV2.all = []
    }

    bind_selector = null

    order_by = null //Tên trường, mặc định: name

    order_type = null //Mặc định ASC

    /**
     DataSample:
     var data1 = [
     {'id': 1, 'name': "Node 1", 'parent_id': 0, 'ext': '', 'order':1},
     {'id': 2, 'name': "Node 2", 'parent_id': 0, 'ext': '', 'order':1},
     {'id': 3, 'name': "Node 3", 'parent_id': 0, 'ext': '', 'order':2},
     {'id': 4, 'name': "Node 4", 'parent_id': 0, 'ext': '', 'order':3},
     {'id': 5, 'name': "Node 5", 'parent_id': 0, 'ext': '', 'order':1},
     {'id': 6, 'name': "Node 11", 'parent_id': 1, 'ext': '', 'order':6},
     {'id': 7, 'name': "Node 12", 'parent_id': 1, 'ext': '', 'order':8},
     {'id': 8, 'name': "Node 13", 'parent_id': 1, 'ext': '', 'order':4},
     ]
     */
    data = null;

    /**
     * Data API:
     - list node:   url:    this.api_data
     - create node: url:    this.api_data + "?cmd=create&pid=" + pid + '&new_name='+ nodeName,
     - rename node: url:    this.api_data + "?cmd=rename&id=" + nodeId + '&to_name='+ nodeName,
     - move node:   url:    this.api_data + "?cmd=move&id=" + nodeId + '&to_id='+ toId + '&beforeOrAfter=' + beforeOrAfter + '&idMoveToBeforeOrAfter=' + idMoveToBeforeOrAfter,
     - delete node: url:    this.api_data + "?cmd=delete&id=" + nodeId,
     */
    api_data = null;  //Nếu có api, thì sẽ ưu tiên data từ API, với tham số như //..<api_data>?pid=...

    root_id = 0;

//Nếu có suffix cho các action, thì sẽ dùng suffix, như this.api_data + suffix
//Dành cho việc thay đổi url api
//(***** Chưa có thay đổi các field get post)
//     api_suffix_index = 'list';
    api_suffix_index = 'tree'; //11.2.23 đổi hết thành tree
    api_suffix_add = null;
    api_suffix_move = null;
    api_suffix_rename = null;
    api_suffix_delete = null;

    cutting_id = null; //Id cut paste

//Security: bear token, cookie...
    header_send = null;

    //có thể Ẩn root node name (vẫn để vùng root, chỉ ẩn tên, button
    hide_root_node = 0 ;
    // show_root_menu = 0; //ẩn root nhưng vẫn cho phép menu

    disable_drag_drop = 0 ;
    disable_menu = 0 ;

    //Có thể dùng trong trường hợp show all tree, ko cho toggle
    disable_toggle = 0 ;

    //cho phép kéo sang tree khác selector, ví dụ cho trường hợp để 2,3 panel kéo sang nhau, mỗi panel là 1 tree nhỏ trong tree lớn...
    //khi này, cẩn thận vấn đề dữ liệu , 2 tree phải có dữ liệu Logic phù hợp bài toán cụ thể
    //Vì nguyên tắc là chỉ xử lý số ID node kéo sang
    allow_drag_to_other_tree_selector = 0

//opt_open_all_first: Mở tất cả các item ngay từ đầu hay không
//Nếu dữ liệu ajax thì api có option load tất cả data về
    opt_open_all_first = false;

    checkbox1 = null;

    radio1 = null

    static dragLeave(ev) {
        // ev.target.style.backgroundColor = 'white';
        // if(ev.target.matches('.empty_node_pad'))
        ev.target.style.backgroundColor = 'white';
        ev.preventDefault();
        return false;
    }

    static allowDrop(ev) {

        var thisDropElm = ev.target;
        let tree1 = clsTreeJsV2.getInstanceTreeOfAnyObject(thisDropElm);
        if(tree1.disable_drag_drop)
            return;
        //vung khac khong cho drop
        // var tree_bind_selector = ev.dataTransfer.getData("tree_bind_selector");
        // var thisDropElm = ev.target;
        // let tree1 = clsTreeJsV2.getInstanceTreeOfAnyObject(thisDropElm);
        // console.log(" Check tree: ", tree1.bind_selector, tree_bind_selector);
        //
        // if (tree1.bind_selector != tree_bind_selector) {
        //     console.log(" Can not move NOT the same tree: ", tree1.bind_selector, tree_bind_selector);
        //     return;
        // }

        if (ev.target.matches('.empty_node_pad'))
            ev.target.style.backgroundColor = 'gray';
        else
            ev.target.style.backgroundColor = '#ccc';
        ev.preventDefault();
        return false;
    }

    static drag_event(ev) {



        ev.dataTransfer.setData("textId", ev.target.getAttribute('data-tree-node-id'));
        ev.dataTransfer.setData("tree_bind_selector", clsTreeJsV2.getInstanceTreeOfAnyObject(ev.target).bind_selector);
        return false;
    }

    static drop_event(ev) {

        var thisDropElm = ev.target;
        let tree1 = clsTreeJsV2.getInstanceTreeOfAnyObject(thisDropElm);
        if(tree1.disable_drag_drop)
            return;

        ev.preventDefault();
        ev.stopPropagation();

        var textId = ev.dataTransfer.getData("textId");

        var tree_bind_selector = ev.dataTransfer.getData("tree_bind_selector");




        console.log(" Check tree: ", tree1.bind_selector, tree_bind_selector);

        if (tree1.bind_selector != tree_bind_selector) {
            console.log(" Can not move NOT the same tree: ", tree1.bind_selector, tree_bind_selector);
            return;
        }

        console.log(" textId = " + textId);

        var parentOfDrag = tree1.getNodeByDataId(textId).parentElement;
        var parentOfDragId = tree1.getNodeByDataId(textId).parentElement.getAttribute('data-tree-node-id');


        var thisDropElmId = ev.target.getAttribute('data-tree-node-id');
        var parentOfDropId = thisDropElm.parentElement.getAttribute('data-tree-node-id');


        console.log(" textId = " + textId);

        console.log(" toID Elament = ", thisDropElm);
        console.log(" toID thisDropElm.parentElement = ", thisDropElm.parentElement);

        tree1.getNodeByDataId(textId).style.backgroundColor = "#ccc";


        thisDropElm.style.backgroundColor = 'white';

        if (!textId) {
            console.log("Not id to move node?");
            return;
        }

        if (textId == thisDropElm.getAttribute('data-tree-node-id')) {
            console.log("Can Not to move to it self?");
            return;
        }

        if (tree1.getNodeByDataId(textId).contains(thisDropElm)) {
            console.log("KHong the move vao con!");
            return;
        }

        //Nếu di chuyển đến parent của nó thì bỏ qua
        if (tree1.getNodeByDataId(textId).parentElement.getAttribute('data-tree-node-id') == thisDropElm.getAttribute('data-tree-node-id')) {
            console.log("Ignore because move to parent");
            return;
        }

        //Nếu drop vào 1 cái empty_node_pad, thì tìm tiếp theo của empty_node_pad để đưa vào trước, hoặc cái trước padzone và đưa vào sau
        //Là change order
        if (thisDropElm.matches('.empty_node_pad')) {

            var beforeOrAfter = null
            var idMoveToAfterOrBefore = null
            if (thisDropElm.previousElementSibling) {
                beforeOrAfter = 'after';
                idMoveToAfterOrBefore = thisDropElm.previousElementSibling.getAttribute('data-tree-node-id')
            } else if (thisDropElm.nextElementSibling) {
                beforeOrAfter = 'before';
                idMoveToAfterOrBefore = thisDropElm.nextElementSibling.getAttribute('data-tree-node-id')
            }

            if (tree1.moveNode(textId, parentOfDropId, beforeOrAfter, idMoveToAfterOrBefore)) {

                //Nếu có node nào ở trước padzone, thì chuyển đến sau node đó
                if (thisDropElm.previousElementSibling) {
                    console.log(textId + "--- Chuyển đến sau ID : " + thisDropElm.previousElementSibling.getAttribute('data-tree-node-id'));
                    //Đưa node vào sau cái trước padzone
                    //if(this.changeOrder(thisDropElmId,textId, 'after'))
                    thisDropElm.previousElementSibling.after(tree1.getNodeByDataId(textId));
                } else
                    //Nếu có node nào ở sau padzone, thì chuyển đến trước node đó
                if (thisDropElm.nextElementSibling) {
                    //Đưa node vào trước cái sau padzone
                    //if(this.changeOrder(thisDropElmId,textId, 'before'))
                    thisDropElm.nextElementSibling.before(tree1.getNodeByDataId(textId));
                    console.log(textId + "--- Chuyển đến trước ID : " + thisDropElm.nextElementSibling.getAttribute('data-tree-node-id'));
                }

                //Sắp xếp lại vùng cũ vừa rời đi:
                console.log(" Sắp xếp lại vùng cũ vừa rời đi2: ", parentOfDragId);
                tree1.reArrangePadZone(parentOfDragId);
                //Sắp xếp lại parrent của padzone
                console.log("===  Sắp xếp lại parent của padzone: ");
                tree1.reArrangePadZone(parentOfDropId);
                console.log("===  Kết thúc Sắp xếp lại parent của padzone");

            } else {
                alert("Can not move item");
            }

        } else {
            //Nếu Node đó đang đóng thì mở nó ra trước:
            tree1.toggleOpenNodeData(thisDropElmId);
            //Nếu Drop vào 1 node, thì gắn luôn vào làm con của node đó
            console.log(textId + " --- Chuyển vào trong ID: " + thisDropElmId);
            //Gọi ajax ở đây:
            if (tree1.moveNode(textId, thisDropElmId)) {
                thisDropElm.appendChild(tree1.getNodeByDataId(textId));
                // console.log("xxxxxx");
                //Xu ly đệm của đích:
                tree1.reArrangePadZone(thisDropElmId)
                console.log(" Sắp xếp lại vùng cũ vừa rời đi1: ", parentOfDragId);
                tree1.reArrangePadZone(parentOfDragId);
            } else {
                alert("Can not move item");
            }
        }
    }

    static htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }

    addPadZoneTo(nodeId, cond) {
        // console.log(" AddPadToZone ...", nodeId);
        // console.log(" COND : " + cond);
        // console.log(" NodeId = " , node1);
        var node1 = this.getNodeByDataId(nodeId);
        var newDiv = clsTreeJsV2.htmlToElement('<div class="empty_node_pad" ' +
            ' ondrop="clsTreeJsV2.drop_event(event)" ' +
            ' ondragleave="clsTreeJsV2.dragLeave(event)" ' +
            ' ondragover="clsTreeJsV2.allowDrop(event)" >  </div>');

        if (cond === 'before') {
            // console.log("Add before");
            node1.before(newDiv)
        } else {
            // console.log("Add after");
            node1.after(newDiv)
        }
    }

    getNameNode(nodeId) {
        return this.getNodeByDataId(nodeId).querySelector("span.node_name").textContent
    }

    resetAllToggleButtonSign() {

        console.log("Reset resetAllToggleButtonSign");
        $(this.bind_selector + " .real_node_item").each(function () {
            var haveOneChildOnUI = 0;
            for (let child of this.children) {
                if (child.matches(".real_node_item")) {
                    haveOneChildOnUI = 1;
                    break;
                }
            }

            var needCloseButton = 0;
            if ($(this).attr('data-has-child') == 1)
                if (haveOneChildOnUI)
                    needCloseButton = 1;

            //Nếu đã mở hết, thì lại phải là nút đóng
            if (needCloseButton) {
                $(this).find('span.toggle_node').html("&#x25bc");
                // $(this).attr('data-has-child', 1);
                $(this).find('span.toggle_node').html("&#x25BD");
            } else {
                $(this).find('span.toggle_node').html("&#x25ba");

                $(this).find('span.toggle_node').html("&#x25B7");
            }

            if ($(this).attr('data-has-child') == 0)
                $(this).find('span.toggle_node').html("&#8722");

            // else {
            //     // $(this).attr('data-has-child', 0);
            //
            //     let mData = this.getChildInNode(this.getAttribute('data-tree-node-id'));
            //     if (mData.length)
            //         $(this).find('span.toggle_node').html("+");
            //     else
            //         $(this).find('span.toggle_node').html("*");
            // }
        })
    }


//Sắp xếp lại các div đệm, duyệt từ trên xuống, 2 cái nào gần nhau ko có đệm, thì cần đưa đệm vào
//Lấy 2 đệm gần nhau để đưa vào đó
//Vùng nào ko còn Node, thì bỏ hết đệm
    reArrangePadZone(nodeParentId) {

        if (!nodeParentId)
            return;
        var parentNode = this.getNodeByDataId(nodeParentId);

        if (!parentNode) {
            return;
        }

        var allChild = parentNode.children;
        // console.log(" AllChild to addPad: ", allChild);
        //Duyệt tất cả node, trước và sau node chỉ có 1 và chỉ 1 đệm
        //Thừa thì xóa, thiếu thì thêm
        //console.log(" allChild.length " , allChild.length);
        if (!allChild)
            return;
        var mIdChild = [];
        for (let child of allChild) {
            if (!child.getAttribute('data-tree-node-id'))
                continue;
            mIdChild.push(child.getAttribute('data-tree-node-id'));
        }

        // console.log("MidChind = " , mIdChild);

        let len = mIdChild.length;
        for (var i = 0; i < len; i++) {
            // console.log(" -- check node " + i , mIdChild[i]);
            if (this.getNodeByDataId(mIdChild[i]).matches('.real_node_item')) {
                //Nếu node đầu tiên không phải đệm, hoặc 1 node bất kỳ mà trước không có đệm, thì thêm đệm vào trước:
                if (i == 0 || i > 0 && !this.getNodeByDataId(mIdChild[i - 1]).matches(".empty_node_pad")) {
                    // console.log("Add padzone to before0 - " + i, mIdChild[i]);
                    this.addPadZoneTo((mIdChild[i]), 'before')
                }
                //Nếu sau node nào đó không có đệm, thì thêm đệm vào sau nó
                if (i == len - 1 || i < len - 1 && !this.getNodeByDataId(mIdChild[i + 1]).matches(".empty_node_pad")) {
                    this.addPadZoneTo((mIdChild[i]), 'after')
                }
            }
        }
        // if (allChild[allChild.length - 1].matches('.real_node_item'))
        //     this.addPadZoneTo(allChild[allChild.length - 1].id, 'after')

        //Chỗ nào có 2 đệm thì bỏ đi 1:
        for (var x = 0; x < 3; x++) // lặp 3 lần
            for (let child of allChild) {
                // console.log(" -- check node ", child);
                if (child.matches('.empty_node_pad')) {
                    // console.log("Pad zone ...");
                    if (child.nextElementSibling && child.nextElementSibling.matches('.empty_node_pad')) {
                        child.parentNode.removeChild(child);
                        // console.log("REMOVE OK next 1");
                    }
                    if (child.previousElementSibling && child.previousElementSibling.matches('.empty_node_pad')) {
                        child.parentNode.removeChild(child);
                        // console.log("REMOVE OK prev 1");
                    }
                }
            }

        //Nếu ko còn node thì bỏ hết pad
        var foundNode = 0;
        for (let child of allChild) {
            if (child.matches('.real_node_item')) {
                foundNode = 1;
                break;
            }
        }
        if (!foundNode) {
            for (let child of allChild) {
                if (child.matches('.empty_node_pad'))
                    child.parentNode.removeChild(child);
            }
        }
    }

    moveNode(nodeId, toId, beforeOrAfter = '', idMoveToBeforeOrAfter = '') {

        let user_token = jctool.getCookie('_tglx863516839');

        console.log(" === MoveNode === ");

        let strIdInNode = clsTreeJsV2.getChildsIdList(toId);
        strIdInNode = "," + strIdInNode + ",";
        // console.log(" strNodeID = " + strIdInNode);

        if(idMoveToBeforeOrAfter != nodeId)
            if(beforeOrAfter == 'after'){
                strIdInNode = ',' + strIdInNode.replace(',' + nodeId + ',', ',') + ',';
                //Move lên đầu
                if(!idMoveToBeforeOrAfter){
                    // console.log(" case 1");
                    strIdInNode = nodeId + ',' + strIdInNode;
                }
                else{
                    // console.log(" case 2");
                    strIdInNode = strIdInNode.replace(',' + idMoveToBeforeOrAfter + ',', ',' + idMoveToBeforeOrAfter + ',' + nodeId + ',');
                }
            }
        strIdInNode = jctool.trimLeftRightAndRemoveDoubleComma(strIdInNode);
        // console.log("New nodeid list order: " + strIdInNode);

        let param = "id=" + nodeId + '&to_id=' + toId + '&new_order_node=' + strIdInNode;
        var url = this.api_data + "?cmd=move&" + param
        if (this.api_suffix_move)
            url = this.api_data + '/' + this.api_suffix_move + "?" + param


        console.log("URL moveNode: " + url);

        if (this.api_data) {
            var jqXHR = $.ajax({
                url: url,
                type: 'GET',
                async: false,
                // data: dataPost,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + user_token);
                    // xhr.setRequestHeader("Cookie", "currentUser=TK_380e420b4b4149560c4256160a0a");
                },
                success: function (result) {
                    console.log(" RET1 = ", result);
                    // return mRet  = result
                },
                error: function (result) {
                    alert("Có lỗi xảy ra 1!")
                    console.log(" RET21 = ", result);
                },
            });
            try {
                return JSON.parse(jqXHR.responseText);
            } catch (e) {
                return false;
            }
            return 0;
        } else {
            return 1;
        }

        return 0;
    }

    getStrTreeNode(pid, dataIn) {
        var strAll = '';
        for (let elm1 of dataIn) {
            // console.log("ELM " , elm1);
            if (elm1.parent_id == pid) {

                // var otherNodeNested = ''
                // if (this.opt_open_all_first)
                //     otherNodeNested = this.getStrTreeNode(elm1.id, dataIn)
                // strAll += this.getHtmlOneNodeNotEndDiv(elm1.id , elm1.name, otherNodeNested)

                strAll += this.getHtmlOneNodeNotEndDiv(elm1)

                // strAll += '<div class="real_node_item" data-tree-node-id="' + elm1.id + '" draggable="true" ondragstart="this.drag_event(event)" ondrop="this.drop_event(event)"' +
                //     ' ondragleave="this.dragLeave(event)" ondragover="this.allowDrop(event)" style="">';
                // strAll += "<span class='toggle_node'> + </span> <span class='node_name'>" + (elm1.name) + "</span>";
                //
                if (this.opt_open_all_first)
                    strAll += this.getStrTreeNode(elm1.id, dataIn)
                //
                strAll += "</div>";
            }
        }
        return strAll;
    }

    showTree0(dataIn) {

        this.fillHasChildDataIfNotExist(dataIn)

        console.log(" DataIN0 = ", this.data);
        console.log(" DataIN = ", dataIn);

        console.log(" TreeV2 All2 = " , clsTreeJsV2.all);
        this.data = dataIn;

        var str_tree = this.getStrTreeNode(this.root_id, dataIn);

        let rootNode = {'id': this.root_id, 'parent_id': 0, 'name': 'ROOT', 'has_child': 1}

        //var strAll = '<div data-tree-node-id="' + tree_container_id + '" class="real_node_item" ondrop="this.drop_event(event)" ondragleave="this.dragLeave(event)" ' +
        //  'ondragover="this.allowDrop(event)" style="">';
        // strAll += str_tree;

        var strAll = "<div class='debug_info_tree'></div>";
        strAll = '';
        strAll += this.getHtmlOneNodeNotEndDiv(rootNode)
        strAll += str_tree;
        strAll += ("</div>");

        let that = this

        //document.getElementById("tree_container").replaceWith(this.htmlToElement(strAll));
        //document.getElementById("tree_container").innerHTML = strAll ;//this.htmlToElement(strAll);
        $(this.bind_selector).html(strAll);
        $(this.bind_selector).addClass('cls_root_tree')
        $(this.bind_selector).attr('data-tree-bind-selector', this.bind_selector)

        $(this.bind_selector + " .real_node_item").each(function () {
            that.reArrangePadZone(this.getAttribute('data-tree-node-id'));
        })

        this.resetAllToggleButtonSign();
    }

    showTree() {

        var dataIn = null;

        var url = this.api_data + '/' + this.api_suffix_index + '?pid=' + this.root_id;
        if (this.opt_open_all_first)
            url += '&get_all=1';

        if (this.order_by)
            url = url + '&order_by=' + this.order_by ;
        let user_token = jctool.getCookie('_tglx863516839');

        let that1 = this;
        console.log("URL showTree: " + url);
        if (this.api_data) {

            $.ajax({
                url: url,
                type: 'GET',
                async: false,
                // data: dataPost,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + user_token);
                    // xhr.setRequestHeader("Cookie", "currentUser=TK_380e420b4b4149560c4256160a0a");
                },
                success: function (result) {
                    dataIn = result.payload;
                    console.log(" RET112 = ", result);
                    that1.showTree0(dataIn)
                    return dataIn;
                },
                error: function (result) {
                    alert("Có lỗi xảy ra 2!")
                    console.log(" RET2 = ", result);
                },
            });

        } else {
            dataIn = this.data;
            this.showTree0(dataIn)
        }
        return dataIn;
    }

    getHtmlOneNodeNotEndDiv(elm, full = null) {

        var buttonTogle = '&#9660;'
        if (elm.has_child)
            buttonTogle = '&#9658;'

        var checkBox1 = ''
        if (this.checkbox1)
            checkBox1 = "<input type='checkbox' class='check_box_node1'>"

        var radioBox1 = ''
        if (this.radio1)
            radioBox1 = "<input type='radio' name='group_" + this.bind_selector + "' class='radio_box_node1'>"

        var padHideRoot = ''
        if(elm.id == this.root_id && this.hide_root_node){
            checkBox1 = radioBox1 = ''
            padHideRoot = ';display: none;'
        }
        var padHideMenu = ''
        if(this.disable_menu){
            padHideMenu = ';display: none;'
        }

        let padClassRoot = ''
        let padClassRoot0 = ''
        if(elm.id == this.root_id){
            padClassRoot = 'root_tree_cls_span';
            padClassRoot0 = 'root_tree_cls_div';
        }

        // var padRootClass = null
        // if(elm.id == 0){
        //     padRootClass = 'is_root_tree'
        // }

        let str = '<div title="'+ elm.id +'" style="" class="real_node_item ' + padClassRoot0 + '" data-parent="'+ elm.parent_id +'" data-has-child="' + elm.has_child + '" data-tree-node-id="' + elm.id + '" ' +
            'draggable="true" ondragstart="clsTreeJsV2.drag_event(event)" ondrop="clsTreeJsV2.drop_event(event)" ' +
            'ondragleave="clsTreeJsV2.dragLeave(event)" ondragover="clsTreeJsV2.allowDrop(event)" style="">' +
            checkBox1 +
            radioBox1 +
            '<span style="' + padHideMenu + '" class="menu_one_node">&#9783;</span>' +
            '<span style="' + padHideRoot + '" class="toggle_node"> ' + buttonTogle + ' </span>  '

            if(elm.id != this.root_id)
                str += '<span style="' + '' + '" class="node_extra_info_before_name"></span> ';

            str += '<span data-code-pos="ppp1676777479654" style="' + padHideRoot + '" class="node_name ' + padClassRoot + '">' + elm.name + '</span> '

            if(elm._public_link){
                str += '<a href="'+ elm._public_link +'" target="_blank"><i style="color: green" class="fa fa-share-alt"></i></a> ';
            }

            if(elm.id != this.root_id)
                str += '<span style="' + '' + '" class="node_extra_info_after_name"></span> ';

        if (full)
            return str + '</div>';
        return str;
    }

    getStrHtmlOneNodeFull(elm) {
        return this.getHtmlOneNodeNotEndDiv(elm, 1)
    }

    renameNode(nodeId, nodeName) {
        let user_token = jctool.getCookie('_tglx863516839');

        let param = "id=" + nodeId + '&to_name=' + nodeName;
        var url = this.api_data + "?cmd=rename&" + param
        if (this.api_suffix_rename)
            url = this.api_data + '/' + this.api_suffix_rename + "?" + param

        console.log("URL rename: " + url);
        if (this.api_data) {
            var jqXHR = $.ajax({
                //url: this.api_data + "?cmd=rename&id=" + nodeId + '&to_name='+ nodeName,
                url: url,
                type: 'GET',
                async: false,
                // data: dataPost,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + user_token);
                    // xhr.setRequestHeader("Cookie", "currentUser=TK_380e420b4b4149560c4256160a0a");
                },
                success: function (result) {
                    console.log(" RET1 = ", result);
                    // return mRet  = result
                },
                error: function (result) {
                    alert("Can not rename !")
                    console.log(" RET2 = ", result);
                },
            });
            try {
                JSON.parse(jqXHR.responseText);
            } catch (e) {
                alert("Can not rename!")
                return false;
            }
        } else {

        }

        console.log(" this.getNodeByDataId(newNodeId).querySelector(span.node_name) = ", this.getNodeByDataId(nodeId).querySelector("span.node_name"));
        this.getNodeByDataId(nodeId).querySelector("span.node_name").textContent = nodeName;

    }

    addNewNodeUi(elm) {

        if (!elm.id)
            throw "Error: trung ID " + elm.id;

        //Kiểm tra trùng lặp
        $(this.bind_selector + ".real_node_item").each(function () {
            if (elm.id == $(this).attr('data-tree-node-id')) {
                throw "Error: duplicate ID " + elm.id;
            }
        })

        // var elm = {'id': nodeId, 'name': nodeName, 'has_child': 0 };
        let str = this.getHtmlOneNodeNotEndDiv(elm) + "</div>"

        this.getNodeByDataId(elm.parent_id).append(clsTreeJsV2.htmlToElement(str));
    }

    addNode(pid, nodeName, nodeIdLocal = '1230000000') {

        //Mở ra trước khi add, bị loop
//    this.toggleOpenNodeData(pid);

        let param = "pid=" + pid + '&new_name=' + nodeName
        var url = this.api_data + "?cmd=create&" + param
        if (this.api_suffix_add)
            url = this.api_data + '/' + this.api_suffix_add + "?" + param

        console.log("URL add: " + url);

        var elm = null;
        let user_token = jctool.getCookie('_tglx863516839');

        if (this.api_data) {
            var jqXHR = $.ajax({
                url: url,
                //url: this.api_data + "?cmd=create&pid=" + pid + '&new_name='+ nodeName,
                type: 'GET',
                async: false,
                // data: dataPost,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + user_token);
                    // xhr.setRequestHeader("Cookie", "currentUser=TK_380e420b4b4149560c4256160a0a");
                },
                success: function (result) {
                    console.log(" RET1 done add node? = ", result);
                    // return mRet  = result



                },
                error: function (result) {
                    alert("Có lỗi xảy ra 3!")
                    console.log(" RET2 = ", result);
                    return false;
                },
            });

            try {
                var ret = JSON.parse(jqXHR.responseText);
                if (ret.payload) {
                    elm = {'id': ret.payload, 'parent_id': pid, 'name': nodeName, 'has_child': 0};
                }
            } catch (e) {
                return false;
            }

        } else {
            //với data local, chưa có ID:
            elm = {'id': nodeIdLocal, 'name': nodeName, 'parent_id': pid, 'has_child': 0};
        }

        this.addNewNodeUi(elm)

        // addExtraInfoToNode()

        this.reArrangePadZone(pid)

        return 1;
    }

    deleteNode(nodeId) {

        //Mở ra trước khi add, bị loop
//    this.toggleOpenNodeData(pid);

        let param = "id=" + nodeId
        var url = this.api_data + "?cmd=delete&" + param
        if (this.api_suffix_delete)
            url = this.api_data + '/' + this.api_suffix_delete + "?" + param
        let user_token = jctool.getCookie('_tglx863516839');

        console.log("URL del: " + url);

        if (this.api_data) {
            var jqXHR = $.ajax({
                //url: this.api_data + "?cmd=delete&id=" + nodeId,
                url: url,
                type: 'GET',
                async: false,
                // data: dataPost,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + user_token);
                    // xhr.setRequestHeader("Cookie", "currentUser=TK_380e420b4b4149560c4256160a0a");
                },
                success: function (result) {
                    console.log(" RET1 = ", result);
                    // return mRet  = result
                },
                error: function (result) {
                    alert("Có lỗi xảy ra 4!")
                    console.log(" RET2 = ", result);
                    return false;
                },
            });

            try {
                var ret = JSON.parse(jqXHR.responseText);
            } catch (e) {
                return false;
            }

        } else {
            //với data local, chưa có ID:
        }

        return 1;
    }

    getChildInNode(pid) {

        let url = this.api_data + '/' + this.api_suffix_index + "?pid=" + pid;
        if (this.order_by)
            url = url + '&order_by=' + this.order_by ;

        console.log("URL get child: " + url);
        let user_token = jctool.getCookie('_tglx863516839');

        if (this.api_data) {
            var jqXHR = $.ajax({
                url: url,
                type: 'GET',
                async: false,
                // data: dataPost,
                beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + user_token);

                    // xhr.setRequestHeader("Cookie", "currentUser=TK_380e420b4b4149560c4256160a0a");
                },
                success: function (result) {
                    console.log(" RET1 = ", result);
                    // return mRet  = result
                },
                error: function (result) {
                    alert("Có lỗi xảy ra 5!")
                    console.log(" RET2 = ", result);
                },
            });
            try {
                return JSON.parse(jqXHR.responseText).payload;
            } catch (e) {
                return false;
            }

        } else {
            var mRet = [];
            for (let elm of this.data) {
                if (elm.parent_id == pid)
                    mRet.push(elm);
            }
            return mRet;
        }
    }

//Tìm tất cả các con, nếu chưa thấy con, thì kích hoạt mở ra:
    toggleOpenNodeData(nodeParentId) {

        console.log(" toggleOpenNodeData(nodeParentId): " + nodeParent);

        var nodeParent = this.getNodeByDataId(nodeParentId)
        var openOK = 0;
        for (let elm of nodeParent.children) {
            if (elm.matches(".real_node_item")) {
                openOK = 1;
            }
        }
        if (!openOK)
            this.toggleNodeData(nodeParentId)

        this.resetAllToggleButtonSign()
    }

    getNodeByDataId(id) {
        return document.querySelector(this.bind_selector + ' [data-tree-node-id="' + id + '"]')
        // return $(this.bind_selector + ' [data-tree-node-id="' + id + '"]');
    }

    /**
     * @return clsTreeJsV2
     */
    static getInstanceTreeBySelector(bind_selector) {
        for (let tree of clsTreeJsV2.all) {
            if (tree.bind_selector == bind_selector) {
                // console.log(" Found selector = ", tree);
                return tree;
            }
        }
        return null
    }

    /**
     * @return clsTreeJsV2
     */
    static getInstanceTreeOfAnyObject(obj) {

        var bind_selector = $(obj).closest(".cls_root_tree").attr('data-tree-bind-selector');

        // console.log("Get instancc..." + bind_selector);
        // console.log("ALL clsTreeJsV2: " , clsTreeJsV2.all);

        for (let tree of clsTreeJsV2.all) {
            // console.log(" Tree x = :, ", tree);
            if (tree.bind_selector == bind_selector) {
                // console.log(" Found selector = ", tree);
                return tree;
            }
        }
        return null
    }

    /**
     * nodeID của bất kỳ 1 phần tử nào chứa cha có class là .real_node_item
     * @param elm
     * @returns {*|jQuery}
     */
    static getNodeIdOfElement(elm) {
        let nodeId = $(elm).parent(".real_node_item").attr('data-tree-node-id');
        return nodeId;
    }

    static getChildsIdList(pid) {
        console.log(" --- getChildsIdList ... " + pid);
        let childList = '';
        $('[data-tree-node-id="' + pid +'"] > .real_node_item').each(function () {
            let childId = $(this).attr('data-tree-node-id');
            console.log("Child = ",  childId);
            childList += childId + ",";
        })
        childList = jctool.trimLeftRightAndRemoveDoubleComma(childList);
        console.log(" ChildList = " + childList);
        return childList
    }

    /**
     * @return clsTreeJsV2
     */
    static getInstanceTreeOfNodeId(nodeId) {
        var idTree = null;
        console.log(" ==== getInstanceTreeOfNodeId ");
        console.log(" = nodeId = ", nodeId);
        $("[data-tree-node-id='" + nodeId + "']").each(function () {
            idTree = $(this).closest(".cls_root_tree").attr('id');
        })

        console.log(" idTree = ", idTree);

        console.log("clsTreeJsV2.all = ", clsTreeJsV2.all);

        for (let tree of clsTreeJsV2.all) {
            console.log(" Tree x = :, ", tree);
            if (tree.bind_selector == idTree) {
                console.log(" Found selector = ", tree);
                return tree;
            }
        }

        console.log(" Not found selector with id = " + idTree);
        return null;
    }

    /**
     * Show Hide Node data
     * @param nodeParentId
     */
    toggleNodeData(nodeId) {

        // return;
        console.log("--- toggleNodeData = ", nodeId);

        if (!nodeId)
            return;

        var nodeToggle = this.getNodeByDataId(nodeId);
        console.log("NodeIDp1 = ");

        var mNode = []

        //Lệnh remove xóa được hết, ko hiểu sao, nên phải đưa mảng dưới để xóa
        for (let elm of nodeToggle.children) {
            // console.log(" ELM = ", elm);
            if (elm.matches(".real_node_item"))
                mNode.push(elm)
            if (elm.matches(".empty_node_pad"))
                mNode.push(elm)
            //Lệnh này ko xóa được hết, nên phải đưa mảng dưới để xóa
            //node.remove()
        }

        //Nên phải đưa vào 1 mảng để xóa
        //Nếu node có child, thì xóa
        if (mNode.length > 0) {
            for (let node of mNode)
                node.remove()
        }
        //Nếu ko có thì duyệt tree để add vào:
        else {
            console.log("PID to add new = ", nodeId);
            var mDataInNode = this.getChildInNode(nodeId);
            console.log("mDataInNode1 =  ", mDataInNode);
            for (let dt of mDataInNode) {
                // console.log("DT = " , dt);
                // if('elm_' + dt.parent == nodeParent.id)
                {
                    // dt.parent = nodeId;
                    this.addNewNodeUi(dt)
                }
            }

            this.reArrangePadZone(nodeId);
            this.resetAllToggleButtonSign();
        }
    }

    openModalOfNode(nodeId, cmd, textDesc, textButton) {

        var dialog = document.querySelector(".modal_dialog_edit_node");
        dialog.style.display = "block";
        var node = this.getNodeByDataId(nodeId);
        console.log("Create child in NODE = ", node);
        var rect = node.getBoundingClientRect();
        var x = rect.left + 50;
        var y = rect.top + 10;

        // textBox.style.position = "absolute";
        dialog.style.left = `${x}px`;
        dialog.style.top = `${y}px`;

        $(".modal_dialog_edit_node input").attr("data-tree-selector", this.bind_selector);
        $(".modal_dialog_edit_node input").attr("data-node-id-click-menu", nodeId);
        $(".modal_dialog_edit_node input").attr("data-cmd", cmd);
        $(".modal_dialog_edit_node input.new_name").focus();
        $(".modal_dialog_edit_node .name_desc").text(textDesc);
        $(".modal_dialog_edit_node .btn_create").val(textButton);

        $("input.new_name").prop('value', '');
    }

//Xử lý lại Data hiện có: nếu 1 data chưa có trước has_child, thì thêm vào
//Nhằm mục đích xly data cho tester, cần biết để click đóng mở node
//Nếu data trong DB, thì thường là sẽ có luôn has_child
//Có thể có lúc sẽ ko chính xác, khi chưa lấy all dataDb về, kiểu ko lấy hết cả nhánh, chỉ lấy parent
//Nhưng nguyên tắc là khi lấy từ DB về thì phải có has_child, như vậy hoạt động sẽ chuẩn
    fillHasChildDataIfNotExist(data) {
        console.log(" Data ... = ", data);
        for (let item of data) {
            if (!item.hasOwnProperty("has_child")) {
                item.has_child = 0;
                for (var item1 of data) {
                    if (item1.parent_id == item.id) {
                        item.has_child = 1;
                        break;
                    }
                }
            }
        }
    }

}

$(function () {

    $(".modal_dialog_edit_node input.btn_create").on('click', function () {

        let pid = this.getAttribute('data-node-id-click-menu');
        let cmd = this.getAttribute('data-cmd');
        let treeSelector = this.getAttribute('data-tree-selector');

        let tree1 = clsTreeJsV2.getInstanceTreeBySelector(treeSelector);

        console.log(" NODE id: ", pid);
        console.log(" CMD : ", cmd);
        console.log(" create node : ", this);
        console.log(" new name1 val: ", $("input.new_name").prop('value'));

        if (cmd == 'create_node') {
            ///Call ajax here... to get id new node creating from db

            let newName = $(".modal_dialog_edit_node input.new_name").prop('value')

            tree1.toggleOpenNodeData(pid);

            if (!tree1.addNode(pid, newName))
                alert("Can not create node!")

        }
        if (cmd == 'edit_name') {
            ///Call ajax here... to get id new node creating from db
            //------
            let newName = $(".modal_dialog_edit_node input.new_name").prop('value')
            console.log(" name to edit..." + newName);
            tree1.renameNode(pid, newName);

        }
        if (cmd == 'cut_node') {
            ///Call ajax here... to get id new node creating from db
            //------
            let newName = $(".modal_dialog_edit_node input.new_name").prop('value')
            console.log(" name to edit..." + newName);
            tree1.renameNode(pid, newName);
        }

        $(".modal_dialog_edit_node").hide();
    })

    $(".modal_dialog_edit_node input.new_name").keypress(function (event) {

        if (event.which == 13) {
            event.preventDefault();
            let pid = $(".modal_dialog_edit_node input.btn_create").attr('data-node-id-click-menu');
            let cmd = $(".modal_dialog_edit_node input.btn_create").attr('data-cmd');
            let treeSelector = this.getAttribute('data-tree-selector');
            let tree1 = clsTreeJsV2.getInstanceTreeBySelector(treeSelector);

            console.log(" Enter to crete, cmd = ", cmd);

            if (cmd == 'create_node') {
                ///Call ajax here... to get id new node creating from db
                console.log(" Enter to crete1...");
                let newName = $(".modal_dialog_edit_node input.new_name").prop('value')

                tree1.toggleOpenNodeData(pid);

                tree1.addNode(pid, newName);

            }

            if (cmd == 'edit_name') {

                ///Call ajax here... rename node to db, if success, continue...
                //------

                let newName = $(".modal_dialog_edit_node input.new_name").prop('value')
                console.log(" name to edit..." + newName);
                tree1.renameNode(pid, newName);
            }
            $(".modal_dialog_edit_node").hide();
        }

    });

    // When the user clicks the button, open the modal
    $(".modal_dialog_edit_node .close_btn").on('click', function () {
        $(".modal_dialog_edit_node").hide();
    })

})

$(document).on('click', '.toggle_node', function () {
    // console.log("Click toggle_node, parent =  ", this.parentElement);
    let tree1 = clsTreeJsV2.getInstanceTreeOfAnyObject(this)
    if(tree1.disable_toggle){
        console.log(" disable_toggle = " , tree1.disable_toggle);
        return;
    }
    console.log("Click span, parentID =  ", this.parentElement.getAttribute('data-tree-node-id'));

    tree1.toggleNodeData(this.parentElement.getAttribute('data-tree-node-id'));

    tree1.resetAllToggleButtonSign();
})

$(function () {
    $.contextMenu({
        // selector: '.real_node_item',
        selector: '.menu_one_node', //Với menu có thể trigger Left
        trigger: 'left',
        callback: function (key, options) {
            console.log("CMD Click : " + key);

            let tree1 = clsTreeJsV2.getInstanceTreeOfAnyObject(options.$trigger);
            console.log("TreeFound = ", tree1);

            //Nếu dùng selector: '.menu_one_node' thì lấy parent, là node div
            let thisNodeId = options.$trigger.parent().attr('data-tree-node-id');
            //Nếu ko dùng thì lấy chính node
            //let thisNodeId = options.$trigger.attr('data-tree-node-id');

            console.log(" THISId = ", thisNodeId);
            let parentIdOfNode = tree1.getNodeByDataId(thisNodeId).parentElement.getAttribute('data-tree-node-id');

            let nodeName = tree1.getNameNode(thisNodeId)
            if (key == 'create_node') {

                tree1.openModalOfNode(thisNodeId, "create_node", "Tạo mục mới bên trong: " + nodeName, "Tạo");
            }
            if (key == 'edit_name') {
                tree1.openModalOfNode(thisNodeId, "edit_name", "Sửa tên: " + nodeName, "Sửa");
                $(".modal_dialog_edit_node .new_name").val(nodeName);
            }

            if (key == 'cut') {
                tree1.cutting_id = thisNodeId;
            }

            if (key == 'delete') {

                let text = "Delete this node?";
                if (confirm(text) == true) {
                    if (tree1.deleteNode(thisNodeId)) {
                        tree1.getNodeByDataId(thisNodeId).remove();
                        tree1.reArrangePadZone(parentIdOfNode)
                    }
                }

            }

            if (key == 'paste') {
                console.log(" Cut pate: " + tree1.cutting_id)
                if(!tree1.cutting_id || Number.isNaN(tree1.cutting_id))
                    return;
               // console.log("Node of cutting "  , tree1.getNodeByDataId(tree1.cutting_id));

                //Gán parent cũ để sort lại sau khi đã cắt
                if (tree1.getNodeByDataId(tree1.cutting_id).parentElement.getAttribute('data-tree-node-id') == thisNodeId) {
                    console.log(" Di chuyển đến chính cha, bỏ qua");
                    return;
                }

                //Mở node ra trước khi Move:
                tree1.toggleOpenNodeData(thisNodeId);
                if (tree1.moveNode(tree1.cutting_id, thisNodeId)) {
                    tree1.getNodeByDataId(thisNodeId).appendChild(tree1.getNodeByDataId(tree1.cutting_id));
                    tree1.reArrangePadZone(thisNodeId);

                    //Dùng cái đã gán ở trên, sau khi đã move xong
                    console.log(" reArrangePadZone1: ", parentIdOfNode);
                    tree1.reArrangePadZone(parentIdOfNode);
                }

            }


        },
        items: {
            "edit_name": {
                name: "Rename", icon: "edit", visible: function () {
                    return $(this).parent().attr('data-tree-node-id') > 0;
                }
            },
            "create_node": {name: "Create", icon: "edit"},
            "cut": {
                name: "Cut", icon: "cut", visible: function () {
                    return $(this).parent().attr('data-tree-node-id') > 0;
                }
            },
            // copy: {name: "Copy", icon: "copy"},
            "paste": {
                name: "Paste", icon: "paste", visible: function () {
                    return 1;
                }
            },
            "delete": {
                name: "Delete", icon: "delete", visible: function () {
                    return $(this).parent().attr('data-tree-node-id') > 0;
                }
            },
            "sep1": "---------",
            "quit": {
                name: "Quit", icon: function () {
                    return 'context-menu-icon context-menu-icon-quit';
                }
            }
        }
    });



    // $('.real_node_item').on('click', function (e) {
    //
    // })
});

