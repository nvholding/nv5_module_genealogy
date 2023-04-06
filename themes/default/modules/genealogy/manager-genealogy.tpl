<!-- BEGIN: tree -->
<li>
	<span {DIRTREE.class} id="iduser_{DIRTREE.id}">{DIRTREE.lev}.{DIRTREE.weight}: {DIRTREE.full_name}</span>
	<!-- BEGIN: wife -->
	- <span {WIFE.class} id="iduser_{WIFE.id}">{WIFE.full_name}</span>
	<!-- END: wife -->
	<!-- BEGIN: tree_content -->
	<ul>
		<!-- BEGIN: loop -->
		{TREE_CONTENT} <!-- END: loop -->
	</ul>
	<!-- END: tree_content -->
</li>
<!-- END: tree -->

<!-- BEGIN: main -->
<link rel="stylesheet" href="{NV_BASE_SITEURL}themes/{TEMPLATE}/css/clsTreeTopDown.css">
<link rel="stylesheet" href="{NV_BASE_SITEURL}themes/{TEMPLATE}/css/clsTreeJs-v1.css">
    <link rel="stylesheet" href="{NV_BASE_SITEURL}themes/{TEMPLATE}/css/toastr.min.css">
<script src="{NV_BASE_SITEURL}themes/{TEMPLATE}/js/domti.js"></script>
    <script src="{NV_BASE_SITEURL}themes/{TEMPLATE}/js/fsv.js"></script>
    <script src="{NV_BASE_SITEURL}themes/{TEMPLATE}/js/svgpz.js"></script>
    <script src="{NV_BASE_SITEURL}themes/{TEMPLATE}/js/hmer.js"></script>
    <script src="{NV_BASE_SITEURL}themes/{TEMPLATE}/js/lazysizes.min.js"></script>
    <script src="{NV_BASE_SITEURL}themes/{TEMPLATE}/js/lib_base.js"></script>
<script src="{NV_BASE_SITEURL}themes/{TEMPLATE}/js/jquery-image-upload-resizer.js"></script>
    <script src="{NV_BASE_SITEURL}themes/{TEMPLATE}/js/jquery.ui.position.js"></script>

    <script src="{NV_BASE_SITEURL}themes/{TEMPLATE}/js/toastr.min.js"></script>
    <script src="{NV_BASE_SITEURL}themes/{TEMPLATE}/js/toast-show.js"></script>
<script src="{NV_BASE_SITEURL}themes/{TEMPLATE}/js/tree_glx01.js"></script>
<script type="text/javascript" src="{NV_BASE_SITEURL}themes/{TEMPLATE}/js/dinamods.js"></script>
	<div id="dm_tabs_1"><!-- Tabs -->
			<ul class="dm_menu_1">
				<li class="dm_menu_item_1" id="start_tab"><a id="dm_tabs_1_1" class="dm_selected" rel="dm_tab_1_1" href="">Thông tin chi họ</a></li>
				<li class="dm_menu_item_1" id="center_tab"><a id="dm_tabs_1_2" rel="dm_tab_1_2" href="" > Phả đồ</a></li>
				<li class="dm_menu_item_1" id="center_tab"><a id="dm_tabs_1_3" rel="dm_tab_1_3" href="" > Ngày giỗ</a></li>
			</ul>
		</div>
		<div class="clearfix">
		</div>
		<div id="dm_container_11" >
			<div class="dm_tabcontent" id="dm_tab_1_1" >
				<form action="{NV_ACTION_FILE}" method="post">
					<table class="tab1" width="100%">
						<tbody>
							<tr>
								<td>Chi họ</td>
								<td>
								<select name="fid">
									<option value="0">-- Chọn chi họ hoặc nhập tên chi họ --</option>
									<!-- BEGIN: family -->
									<option value="{FAMILY.fid}"{FAMILY.selected}>{FAMILY.title}</option>
									<!-- END: family -->
								</select>
								</td>
							</tr>
						</tbody>
						<tbody class="second">
							<tr>
								<td>Thông tin chi họ:</span></td>
								<td>
								<input name="title" value="{DATA.title}" maxlength="255" style="width: 450px;" type="text"> <span style="color: #CC0000">(*)</span>
								<br>
								<br>
								(ghi chú phần này chỉ nhập tên dòng họ và nội dung đến Quận huyện. VD: <br> <b> Nguyễn Văn, làng Nông Sơn, Điện Phước, Điện Bàn, Quãng Nam </b> )
								<br>
								</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td>Phường/Xã :</td>
								<td>
								<select name="wardid">
									<option value="0">-- Chọn phường --</option>
									<!-- BEGIN: ward -->
									<option value="{WARD.ward_id}" {WARD.selected}>{WARD.title}</option>
									<!-- END: ward -->
								</select> <span style="color: #CC0000">(*)</span></td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td>Quận/Huyện :</td>
								<td>
								<select name="districtid">
									<option value="0">-- Chọn quận --</option>
									<!-- BEGIN: district -->
									<option value="{DISTRICT.district_id}" {DISTRICT.selected}>{DISTRICT.title}</option>
									<!-- END: district -->
								</select> <span style="color: #CC0000">(*)</span></td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td>Tỉnh/TP:</td>
								<td>
								<select name="cityid">
									<option value="0">-- Chọn tỉnh --</option>
									<!-- BEGIN: city -->
									<option value="{CITY.city_id}" {CITY.selected}>{CITY.title}</option>
									<!-- END: city -->
								</select> <span style="color: #CC0000">(*)</span></td>
							</tr>
						</tbody>
						
						<tbody class="second">
							<tr>
								<td colspan="2"><b>Phả ký</b> (nguồn gốc xuất xứ của gia tộc, hành trạng của Thuỷ tổ)
								<br>
								<br>
								{DATA.bodytext}</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td colspan="2"><b>Tộc ước </b>(Các quy định của dòng họ)
								<br>
								<br>
								{DATA.rule}</td>
							</tr>
						</tbody>
						<tbody class="second">
							<tr>
								<td colspan="2"><b>Từ đường - Hương hoả</b> Ghi chép về phần đất (lăng mộ dòng họ) tài sản dòng họ( Vật thể như nhà thờ, phi vật thể như các bài cúng, tế ...)
								<br>
								<br>
								{DATA.content}</td>
							</tr>
						</tbody>
					</table>
					
					<table class="tab1" width="100%">
						<caption>Thông tin biên soạn</caption>		
						<tbody class="second">
							<tr>
								<td>Năm biên soạn:</span></td>
								<td>
								<input name="years" value="{DATA.years}" maxlength="55" style="width: 200px;" type="text">
								</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td>Người biên soạn:</span></td>
								<td>
								<input name="author" value="{DATA.author}" maxlength="255" style="width: 450px;" type="text">
								</td>
							</tr>
						</tbody >
						<tbody>
							<tr>
								<td>Tộc trưởng:</span></td>
								<td>
								<input name="patriarch" value="{DATA.patriarch}" maxlength="255" style="width: 450px;" type="text">
								</td>
							</tr>
						</tbody >
						<tbody class="second">
							<tr>
								<td>Người liên hệ:</span></td>
								<td>
								<input name="full_name" value="{DATA.full_name}" maxlength="255" style="width: 450px;" type="text">
								</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td>Điện thoại:</span></td>
								<td>
								<input name="telephone" value="{DATA.telephone}" maxlength="255" style="width: 200px;" type="text">
								</td>
							</tr>
						</tbody>
						<tbody  class="second">
							<tr>
								<td>Email:</span></td>
								<td>
								<input name="email" value="{DATA.email}" maxlength="255" style="width: 450px;" type="text">
								</td>
							</tr>
						</tbody>
						<tbody>
							<tr>
								<td>Thành viên được xem gia phả:</td>
								<td>
								<select name="who_view">
									<!-- BEGIN: who_view -->
									<option value="{WHO_VIEW.id}" {WHO_VIEW.selected}>{WHO_VIEW.title}</option>
									<!-- END: who_view -->
								</select> <span style="color: #CC0000">(*)</span></td>
							</tr>
						</tbody>		
					</table>
					<div style="text-align: center">
						<input name="gid" type="hidden" value="{DATA.gid}" />
						<input name="submit" type="submit" value="{LANG.save}" style="width: 200px;" />
					</div>
					<br/>
						Ghi chú: Nếu không nhập thông tin người liên hệ, hệ thống sẽ lấy thông tin của người tạo chi họ
						<br/><br/>
				</form>
			</div>
		</div>
		<div class="dm_tabcontent" id="dm_tab_1_2" >
			<link type="text/css" href="{NV_BASE_SITEURL}{NV_ASSETS_DIR}/js/jquery-ui/jquery-ui.min.css" rel="stylesheet" />
			<link type="text/css" href="{NV_BASE_SITEURL}{NV_ASSETS_DIR}/js/jquery-ui/jquery-ui.theme.min.css" rel="stylesheet" />
			<link type="text/css" href="{NV_BASE_SITEURL}{NV_ASSETS_DIR}/js/jquery/jquery.treeview.css" rel="stylesheet" />
			<script type="text/javascript" src="{NV_BASE_SITEURL}{NV_ASSETS_DIR}/js/jquery/jquery.treeview.min.js"></script>
			<script type="text/javascript" src="{NV_BASE_SITEURL}{NV_ASSETS_DIR}/js/contextmenu/jquery.contextmenu.r2.js"></script>
			<div id="module_show_list">
			<center>
					<b>Hướng dẫn:</b><i>Click chuột phải lên từng thành viên để có thể cập nhật hoặc thêm mới vợ con.</i>
				</center>
				<br>
				<!-- BEGIN: foldertree -->
				<ul id="foldertree" class="filetree">
					{DATATREE}
				</ul>
				<!-- END: foldertree -->
				<!-- BEGIN: contextMenu -->
				<script type="text/javascript" src="{NV_BASE_SITEURL}{NV_ASSETS_DIR}/js/contextmenu/jquery.contextmenu.r2.js"></script>
				<div class="contextMenu" id="menu_genealogy_show">
					<ul>
						<li id="news1">
							<img src="{NV_BASE_SITEURL}assets/js/contextmenu/icons/copy.png" /> Thêm Con
						</li>
						<li id="news2">
							<img src="{NV_BASE_SITEURL}assets/js/contextmenu/icons/copy.png" /> Thêm Vợ
						</li>
						<li id="news3">
							<img src="{NV_BASE_SITEURL}assets/js/contextmenu/icons/copy.png" /> Thêm chồng
						</li>
						<li id="edit">
							<img src="{NV_BASE_SITEURL}assets/js/contextmenu/icons/rename.png" /> Sửa
						</li>
						<li id="delete">
							<img src="{NV_BASE_SITEURL}assets/js/contextmenu/icons/delete.png" /> Xóa
						</li>
					</ul>
				</div>
				<!-- END: contextMenu -->
			</div>
			<div id="create_genealogy_users" style="overflow:auto;padding:10px;" title="Họ : {PAGE_TITLE}">
				<iframe id="modalIFrame" width="100%" height="100%" marginWidth="0" marginHeight="0" frameBorder="0" scrolling="auto"></iframe>
			</div>
			<div id="UserModal">
			</div>
			<script type="text/javascript">
				//<![CDATA[
				$(document).ready(function() {
					$("#foldertree").treeview();
					$('#foldertree span').contextMenu('menu_genealogy_show', {
						menuStyle:{width:'120px'}, 
						onShowMenu : function(e, menu) {
							var idclass = $(e.target).attr('class');
							if(idclass.search('noadd')>0){
								$('#news1,#news2,#news3', menu).remove();
							}
							if(idclass== 'female' || idclass== 'female hover') {
								$('#news2', menu).remove();
							}
							else if(idclass== 'male' || idclass== 'male hover') {
								$('#news3', menu).remove();
							}
							return menu;
						},
						bindings : {
							'news1' : function(t) {
								var r_split = t.id.split("_");
								$("div#create_genealogy_users").dialog({
									autoOpen : false,
									width : 800,
									height : 500,
									modal : true,
									position : "center"
								}).dialog("open");
								
								$("#modalIFrame").attr('src', nv_base_siteurl + 'index.php?' + nv_lang_variable + '=' + nv_lang_data + '&' + nv_name_variable + '=' + nv_module_name + '&' + nv_fc_variable + '=users&gid={DATA.id}&relationships=1&parentid=' + r_split[1]);
							},
							'news2' : function(t) {
								var r_split = t.id.split("_");
								$("div#create_genealogy_users").dialog({
									autoOpen : false,
									width : 800,
									height : 500,
									modal : true,
									position : "center"
								}).dialog("open");
								$("#modalIFrame").attr('src', nv_base_siteurl + 'index.php?' + nv_lang_variable + '=' + nv_lang_data + '&' + nv_name_variable + '=' + nv_module_name + '&' + nv_fc_variable + '=users&gid={DATA.id}&relationships=2&parentid=' + r_split[1]);
							},
							'news3' : function(t) {
								var r_split = t.id.split("_");
								$("div#create_genealogy_users").dialog({
									autoOpen : false,
									width : 800,
									height : 500,
									modal : true,
									position : "center"
								}).dialog("open");
								$("#modalIFrame").attr('src', nv_base_siteurl + 'index.php?' + nv_lang_variable + '=' + nv_lang_data + '&' + nv_name_variable + '=' + nv_module_name + '&' + nv_fc_variable + '=users&gid={DATA.id}&relationships=3&parentid=' + r_split[1]);
							},
							'edit' : function(t) {
								var r_split = t.id.split("_");
								$("div#create_genealogy_users").dialog({
									autoOpen : false,
									width : 800,
									height : 500,
									modal : true,
									position : "center"
								}).dialog("open");
								
								$("#modalIFrame").attr('src', nv_base_siteurl + 'index.php?' + nv_lang_variable + '=' + nv_lang_data + '&' + nv_name_variable + '=' + nv_module_name + '&' + nv_fc_variable + '=users&id=' + r_split[1]);
							},
							'delete' : function(t) {
								if(confirm('Bạn có chắc chọn xóa thành viên, xóa thành viên này hệ thống sẽ xóa tất cả các thành viên là vợ, con, cháu ..')) {
									var r_split = t.id.split("_");
									window.location = nv_base_siteurl + 'index.php?' + nv_lang_variable + '=' + nv_lang_data + '&' + nv_name_variable + '=' + nv_module_name + '&' + nv_fc_variable + '=shows&&gid={DATA.id}&deleteid=' + r_split[1];
								}
							}
						}
					});
				});
				//]]>
			</script>
			<!-- BEGIN: create_users -->
			<script type="text/javascript">
				//<![CDATA[
				$(document).ready(function() {
					$("#modalIFrame").attr('src', nv_base_siteurl + 'index.php?' + nv_lang_variable + '=' + nv_lang_data + '&' + nv_name_variable + '=' + nv_module_name + '&' + nv_fc_variable + '=users&gid={DATA.id}&parentid=0');
				});
				//]]>
			</script>
			<!-- END: create_users -->
		</div>
		<div class="dm_tabcontent" id="dm_tab_1_3" >
		</div>
	<div class="main_cont">


    
    

<!--<div class="btn_ctrl_svg1" style="right: 20px; ">-->
<!--    <img style="" src="/assert/Ionicons/src/share-alt1.svg" alt="">-->
<!--</div>-->

<div onclick="showHelpDgl()" class="btn_ctrl_svg1" style="right: 20px; border: 0px; width: 80px; font-weight: bold; font-size: 15px ">
<!--    <img style="width: 18px; margin-right: 2px" src="/assert/Ionicons/src/help.svg" alt="">-->
    Trợ giúp
</div>

<a href="#">
    <div title="Thành viên" class="btn_ctrl_svg1" style=" top: 50px; left: 15px;; " onclick="">
        <img style="" src="{NV_BASE_SITEURL}themes/{TEMPLATE}/images/person.svg" alt="">
    </div>
</a>

<div title="Giới hạn cấp xem" class="btn_ctrl_svg1" style="border: 0px;  bottom: 60px; left: 15px; background-color: transparent ">
    <select name="" id="set_limit_tree_level" style=" background-color: white; border-color: #ddd ; color: grey;  ; border-radius: 5px; padding: 4px 3px; max-width: 40px; font-size: small">
        <option value="">-</option>
        <option value="0">0 - Không giới hạn cấp xem</option>

        <option value="1">1 - Giới hạn xem đến cấp 1</option><option value="2">2 - Giới hạn xem đến cấp 2</option><option value="3">3 - Giới hạn xem đến cấp 3</option><option value="4">4 - Giới hạn xem đến cấp 4</option><option value="5">5 - Giới hạn xem đến cấp 5</option><option value="6">6 - Giới hạn xem đến cấp 6</option><option value="7">7 - Giới hạn xem đến cấp 7</option><option value="8">8 - Giới hạn xem đến cấp 8</option><option value="9">9 - Giới hạn xem đến cấp 9</option>

    </select>
</div>

<div title="Thông tin" class="btn_ctrl_svg1" style=" top: 50px; right: 15px;; ">
    <img onclick="clsTreeTopDownCtrl.showInformation()" style="" src="{NV_BASE_SITEURL}themes/{TEMPLATE}/images/information.svg" alt="">
</div>


<div class="" id="tree_info_" style="display: none; position: fixed; top: 100px; right: 15px;;
 max-width: 300px; border: 1px solid #ccc; background-color: snow; border-radius: 5px; padding: 20px ">
    <div title="Thông tin" id="showInformation_close" style="position: fixed; top: 105px; right: 25px;z-index: 1000;">
        ✖
    </div>
    <div id="tree_info_1">
    </div>
</div>

<div class="btn_ctrl_svg1" style="  left: 15px; " onclick="window.location.reload();">
    <img title="Làm mới" style="" src="{NV_BASE_SITEURL}themes/{TEMPLATE}/images/refresh.svg" alt="">
</div>
<div class="btn_ctrl_svg1" style="  left: 60px; " onclick="clsTreeTopDownCtrl.center_fit(&#39;svg_grid&#39;)">
    <img title="Thu gọn" style="" src="{NV_BASE_SITEURL}themes/{TEMPLATE}/images/arrow-shrink.svg" alt="">
</div>

<!--
<div class="btn_ctrl_svg1" style=" left: px; ">
    <img title="Danh sách cây" style="" src="/assert/Ionicons/src/list-ul1.svg" alt="">
</div>

<div class="btn_ctrl_svg1" style=" left: px; ">
<img title="Tạo cây mới" style="" src="/assert/Ionicons/src/plus.svg" alt="">
</div>


-->
<div class="btn_ctrl_svg1" style=" left: 105px; " onclick="clsTreeTopDownCtrl.showConfigTree(&#39;svg_grid&#39;)">
    <img title="Cấu hình" style="" src="{NV_BASE_SITEURL}themes/{TEMPLATE}/images/ios-gear.svg" alt="">
</div>
<div class="btn_ctrl_svg1" style=" left: 150px; " onclick="clsTreeTopDownCtrl.selectBackGround(&#39;svg_grid&#39;,0)">
    <img title="Chọn khung ảnh thành viên" style="" src="{NV_BASE_SITEURL}themes/{TEMPLATE}/images/tablet-portrait-outline.svg" alt="">
</div>


<div onclick="clsTreeTopDownCtrl.downloadImagePng(&#39;svg_grid&#39;, &#39;&#39;)" class="btn_ctrl_svg1" style=" left: 195px; ">
    <img title="Tải xuống dạng ảnh" style="" src="{NV_BASE_SITEURL}themes/{TEMPLATE}/images/android-download.svg" alt="">
</div>


<script>


</script>

    <div id="app_gp" style="">
        <div id="check_error_node" style="display: none"></div>
        <div id="info_svg" style="display: none; float: right; color: red"></div>

        <svg id="svg_grid" class="root_svg" xmlns="http://www.w3.org/2000/svg" style="">
            <defs>
                <filter id="whiteOutlineEffect" color-interpolation-filters="sRGB">
                    <feMorphology in="SourceAlpha" result="MORPH" operator="dilate" radius="1" />
                    <feColorMatrix in="MORPH" result="WHITENED" type="matrix" values="-1 0 0 0 1, 0 -1 0 0 1, 0 0 -1 0 1, 0 0 0 1 0"/>
                    <feMerge>
                        <feMergeNode in="WHITENED"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
        </svg>

        <div id="debug_svg" style="display: none; font-size: smaller; color: #eee"></div>
    </div>

    </div>
	</div>
		
		
	<script>
    let disableApiTreeText = 0
</script>	
		
<script type="text/javascript">
		function addLoadEvent(func) { if (typeof window.onload != 'function') { window.onload = func; } else { var oldonload = window.onload; window.onload = function() { if (oldonload) { oldonload(); } func(); } } }
		addLoadEvent(function(){
			var Dinamods=new dinamods('dm_tabs_1');
			Dinamods.setpersist(true);
			Dinamods.setselectedClassTarget('link');
			Dinamods.init(0,0);});
	</script>
	<script>
    let dataStaticTree ={Treejsons};   
    disableApiTreeText = "Cây Không thuộc Tài khoản của bạn, nên không thể chỉnh sửa!"</script>


<script>
        let domainUrl = ''
    let tree1 = new clsTreeTopDownCtrl()
    let url
    tree1.apiAdd = domainUrl + '/api/member-tree-mng/add'
    tree1.apiUpdate = domainUrl + '/api/member-tree-mng/update'
    tree1.apiDelete = domainUrl + '/api/member-tree-mng/delete'
    tree1.apiUploadImage = domainUrl + '/api/member-file/upload'
    tree1.apiBearToken = jctool.getCookie('_tglx863516839');
    
            tree1.optEnableMoveBtn = 1
    

    
        //111
    tree1.optDisableApiTreeText = disableApiTreeText;
            tree1.objBannerTop = {"id":90,"name":"\u0110\u1ea1i Gia \u0110\u00ecnh","title":"L\u00ca TH\u00c0NH C\u00d4NG","tree_id":2576,"status":null,"image_list":"\/images\/border-banner-bg1\/banner15.png","color_name":"#d512e2","color_title":"#2458ae","fontsize_name":23,"fontsize_title":25,"banner_name_margin_top":45,"banner_name_margin_bottom":0,"banner_title_margin_top":17,"banner_title_margin_bottom":0,"member_background_img":"\/images\/border-frame-img2\/a016.png","member_background_img2":"\/images\/border-frame-img2\/a012.png","banner_width":830,"banner_height":242,"banner_name_bold":"bold","banner_name_italic":null,"banner_title_bold":"bold","banner_title_italic":null,"banner_title_curver":220,"banner_name_curver":270,"banner_text_shadow_name":"text_shadow1","banner_text_shadow_title":"text_shadow1","banner_margin_top":4,"title_before_or_after_name":0};
        if(!tree1.objBannerTop || tree1.objBannerTop.length ==0)
            tree1.initTopBannerEmpty();

    tree1.objBannerTop._image_list = ''
        
    $(function () {
        tree1.widthCell = 80
        tree1.heightCell = 132
        tree1.spaceBetweenCellX = 20
        tree1.spaceBetweenCellY = 50
        tree1.idSvgSelector = 'svg_grid'
        tree1.optShowMarried = 1
        tree1.optShowOnlyMan = 0
        tree1.optDisableApiForTestLocalOnly = 0
        tree1.apiIndex = url
        tree1.optFitViewPortToWindow = 1

                // console.log(" URLSET = ", tree1.apiIndex);

        if (tree1.optDisableApiForTestLocalOnly) {
            url = "data1.php"
            if (jctool.getUrlParam('url1'))
                url = "data2.php"
        }

        if (dataStaticTree) {
            tree1.dataAll = dataStaticTree
            // tree1.dataPart = JSON.parse(JSON.stringify(dataStaticTree))
            // tree1.dataPart = dataStaticTree.slice();
            tree1.dataPart = dataStaticTree

            tree1.setPid = '{Treejsonsstart}';
            // jQuery('.loader1').show();

            if(tree1.dataPart && tree1.dataPart.length > 0) {
                tree1.drawTreeSvg()
                tree1.setZoomAble()

            // if (tree1.dataPart.length > 10)
            //     tree1.fit()
                tree1.moveCenterSvgFirstLoad()
            }
            // jQuery('.loader1').hide();
        } else if (0) {
                    }
    })
    </script>
<!-- END: main -->
