
<!-- BEGIN: main -->
<link type="text/css" href="{NV_BASE_SITEURL}{NV_ASSETS_DIR}/js/ui/jquery.ui.core.css" rel="stylesheet" />
<link type="text/css" href="{NV_BASE_SITEURL}{NV_ASSETS_DIR}/js/ui/jquery.ui.theme.css" rel="stylesheet" />
<link type="text/css" href="{NV_BASE_SITEURL}{NV_ASSETS_DIR}/js/ui/jquery.ui.dialog.css" rel="stylesheet" />
<link type="text/css" href="{NV_BASE_SITEURL}{NV_ASSETS_DIR}/js/jquery/jquery.treeview.css" rel="stylesheet" />
<script type="text/javascript" src="{NV_BASE_SITEURL}{NV_ASSETS_DIR}/js/jquery/jquery.treeview.min.js"></script>
<script type="text/javascript" src="{NV_BASE_SITEURL}{NV_ASSETS_DIR}/js/ui/jquery.ui.core.min.js"></script>
<script type="text/javascript" src="{NV_BASE_SITEURL}{NV_ASSETS_DIR}/js/ui/jquery.ui.dialog.min.js"></script>
<script type="text/javascript" src="{NV_BASE_SITEURL}{NV_ASSETS_DIR}/js/contextmenu/jquery.contextmenu.r2.js"></script>
<div class="pha-ky">
    <div class="pha-ky-one">
        <ul class="list-genealogy clearfix">
        	<li class="col-md-8 col-xs-12">
        		<a href="{DATA.link_main}">Thông tin chung </a>
        	</li>
        	<li class="col-md-8 col-xs-12 ">
        		<a href="{DATA.link_made_up}">Phả ký </a>
        	</li>
        	<li class="col-md-8 col-xs-12 {ACTIVE}">
        		<a href="{DATA.link_family_tree}">Phả đồ</a>
        	</li>
        	<li class="col-md-8 col-xs-12">
        		<a href="{DATA.link_convention}">Tộc ước</a>
        	</li>
        	<li class="col-md-8 col-xs-12">
        		<a href="{DATA.link_collapse}">Hương Hoả</a>
        	</li>
        	<li class="col-md-8 col-xs-12 ">
        		<a href="{DATA.link_anniversary}">Danh sách ngày giỗ</a>
        	</li>
        </ul>
		<!-- BEGIN: adminlink -->
		<ul class="list-genealogy clearfix">
        	<li class="col-md-24 col-xs-24">
        		{ADMINLINK}
        	</li>
        </ul>
		<!-- END: adminlink -->
    </div>
</div>

<div id="module_show_list">
	<!-- BEGIN: orgchart -->
		<script type="text/javascript" src="http://www.google.com/jsapi"></script>
		<script type="text/javascript">
			google.load('visualization', '1', {
				packages : ['orgchart']
			});

		</script>
		<script type="text/javascript">
			function drawVisualization() {
				// Create and populate the data table.
				var data = new google.visualization.DataTable();
				data.addColumn('string', 'Name');
				data.addColumn('string', 'Manager');
				data.addRows({DATACHARTROWS});
				
				<!-- BEGIN: looporgchart -->
					data.setCell({DATACHART.number}, 0, '{DATACHART.id}', '<a href="{DATACHART.link}">{DATACHART.full_name}</a>');
					<!-- BEGIN: looporgchart2 -->
					data.setCell({DATACHART.number}, 1, '{DATACHART.parentid}');
					<!-- END: looporgchart2 -->		
				<!-- END: looporgchart -->

				// Create and draw the visualization.
				new google.visualization.OrgChart(document.getElementById('visualization')).draw(data, {
					allowHtml : true
				});
			}
			google.setOnLoadCallback(drawVisualization);
		</script>
		<div class="tab-giapha padding-topbottom">
			<div class="tabnkv">
				<div class="title-gia-pha">
					<a class="fa fa-certificate">
						<span>Sơ đồ gia phả</span>
					</a>
				</div>
			</div>
			<div id="visualization" style="white-space: nowrap; width: 100%; overflow: auto;">
			</div>
			<br>
	   </div>

		<!-- END: orgchart -->
</div>


<!-- END: main -->