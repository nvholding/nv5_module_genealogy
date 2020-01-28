<?php

/**
 * @Project NUKEVIET 4.x
 * @Author NV Holding (ceo@nvholding.vn)
 * @Copyright (C) 2020 NV Holding. All rights reserved
 * @License GNU/GPL version 2 or any later version
 * @Createdate 01/01/2020 00:00
 */

if( ! defined( 'NV_IS_FILE_ADMIN' ) ) die( 'Stop!!!' );
if( ! defined( 'NV_MODULE_LOCATION' ) ){
	
	$contents = '<p class="note_fam">' . $lang_module['note_location'] . '</p>';
	include NV_ROOTDIR . '/includes/header.php';
	echo nv_admin_theme( $contents );
	include NV_ROOTDIR . '/includes/footer.php';
	die();
	
	
}
$city = $nv_Request->get_int( 'cityid', 'get', '' );
$district = $nv_Request->get_int( 'districtid', 'get', '' );
	// district
$sql = 'SELECT districtid, provinceid, title,type FROM ' . $db_config['prefix'] . '_location_district WHERE status=1 AND provinceid = '.$city.' ORDER BY weight ASC';
$global_array_location_city_district = $nv_Cache->db( $sql, 'districtid', 'location' );
include NV_ROOTDIR . '/includes/header.php';
foreach( $global_array_location_city_district as $district_i =>  $rowsdistrict ){
	$rowsdistrict['selected'] = ($district_i == $district) ? ' selected="selected"' : '';
	echo '<option value="'.$rowsdistrict['districtid'].'" '.$rowsdistrict['selected'].'>'.$rowsdistrict['type']. ' '. $rowsdistrict['title'].'</option>';
}
include NV_ROOTDIR . '/includes/footer.php';
