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
$district = $nv_Request->get_int( 'districtid', 'get', '' );
$ward = $nv_Request->get_int( 'wardid', 'get', '' );
	// ward
$sql = 'SELECT wardid, districtid, title, type FROM ' . $db_config['prefix'] . '_location_ward WHERE status=1 AND districtid = '.$district.' ORDER BY wardid ASC';
$global_array_location_district_ward = $nv_Cache->db($sql, 'wardid', 'location' );
include NV_ROOTDIR . '/includes/header.php';
foreach( $global_array_location_district_ward as $ward_i =>  $rowsward ){
	$rowsward['selected'] = ($ward_i == $ward) ? ' selected="selected"' : '';
	echo '<option value="'.$rowsward['wardid'].'" '.$rowsward['selected'].'>'.$rowsward['type']. ' '. $rowsward['title'].'</option>';
}
include NV_ROOTDIR . '/includes/footer.php';
