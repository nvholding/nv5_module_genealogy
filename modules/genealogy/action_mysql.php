<?php

/**
 * @Project NUKEVIET 4.x
 * @Author NV Holding (ceo@nvholding.vn)
 * @Copyright (C) 2020 NV Holding. All rights reserved
 * @License GNU/GPL version 2 or any later version
 * @Createdate 01/01/2020 00:00
 */

if( ! defined( 'NV_IS_FILE_MODULES' ) ) die( 'Stop!!!' );

$sql_drop_module = array();
$array_table = array(
	'admins',
	'bodytext',
	'family',
	'config_post',
	'genealogy',
	'tags',
	'tags_id',
	'province',
	'district',
	'ward',
	'country',
);
$table = $db_config['prefix'] . '_' . $lang . '_' . $module_data;
$result = $db->query( 'SHOW TABLE STATUS LIKE ' . $db->quote( $table . '_%' ) );
while( $item = $result->fetch( ) )
{
	$name = substr( $item['name'], strlen( $table ) + 1 );
	if( preg_match( '/^' . $db_config['prefix'] . '\_' . $lang . '\_' . $module_data . '\_/', $item['name'] ) and ( preg_match( '/^([0-9]+)$/', $name ) or in_array( $name, $array_table ) or preg_match( '/^bodyhtml\_([0-9]+)$/', $name ) ) )
	{
		$sql_drop_module[] = 'DROP TABLE IF EXISTS ' . $item['name'];
	}
}

$result = $db->query( "SHOW TABLE STATUS LIKE '" . $db_config['prefix'] . "\_" . $lang . "\_comment'" );
$rows = $result->fetchAll();
if( sizeof( $rows ) )
{
	$sql_drop_module[] = "DELETE FROM " . $db_config['prefix'] . "_" . $lang . "_comment WHERE module='" . $module_name . "'";
}

$sql_drop_module[] = "DROP TABLE IF EXISTS " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "";

$sql_create_module = $sql_drop_module;


$sql_create_module[] = "CREATE TABLE IF NOT EXISTS " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . " (
  id int(11) NOT NULL AUTO_INCREMENT,
  gid int(11) NOT NULL DEFAULT '0',
  parentid int(11) NOT NULL DEFAULT '0' COMMENT 'Là con của Ai, thường là bố',
  parentid2 int(11) NOT NULL DEFAULT '0' COMMENT 'Là con của mẹ nào',
  weight int(11) NOT NULL DEFAULT '0' COMMENT 'Là con/vợ thứ mấy (Thứ 2, 3 hay cả, hai, ba , tư..)',
  lev int(11) NOT NULL DEFAULT '0' COMMENT 'Đời thứ',
  relationships tinyint(4) NOT NULL DEFAULT '0' COMMENT 'Quan hệ với người được chọn: Vợ/Con.',
  gender tinyint(4) NOT NULL DEFAULT '0' COMMENT 'Nam/Nữ/Chưa biết',
  status tinyint(4) NOT NULL DEFAULT '0' COMMENT 'Còn sống/ đã mất/ không rõ',
  anniversary_day varchar(10) NOT NULL DEFAULT '0' COMMENT 'Ngày giỗ',
  anniversary_mont varchar(10) NOT NULL DEFAULT '0' COMMENT 'Tháng giỗ',
  actanniversary tinyint(4) NOT NULL DEFAULT '0' COMMENT 'Hiển thị ngày giỗ hay không',
  alias varchar(250) NOT NULL DEFAULT '',
  full_name varchar(250) NOT NULL COMMENT 'Tên húy (Là tên trong khai sinh, tên cúng cơm)',
  code varchar(50) NOT NULL COMMENT 'Số mã hiệu (Là số mã hiệu trong gia phả, nếu có)',
  name1 varchar(200) NOT NULL COMMENT 'Tên tự (Là tên tự gọi)',
  name2 varchar(200) NOT NULL COMMENT 'Là tên thụy phong, truy phong sau khi mất',
  birthday datetime NOT NULL COMMENT 'Ngày giờ sinh ',
  dieday datetime NOT NULL COMMENT 'Ngày giờ mất ',
  life int(11) NOT NULL DEFAULT '0' COMMENT 'Hưởng thọ',
  burial varchar(250) NOT NULL COMMENT 'Mộ táng tại',
  content mediumtext NOT NULL COMMENT 'Sự nghiệp, công đức của nguời này. (Nếu là nữ, ghi tên con, cháu ngoại cũng như các ghi chú khác vào đây.)',
  image varchar(250) NOT NULL COMMENT 'Upload đính kèm ảnh chân dung',
  userid int(11) NOT NULL DEFAULT '0',
  add_time int(11) NOT NULL DEFAULT '0',
  edit_time int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  UNIQUE KEY gid (gid,alias),
  KEY parentid (parentid)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8";


$sql_create_module[] = "CREATE TABLE " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (
	  fid smallint(5) unsigned NOT NULL AUTO_INCREMENT,
	  status tinyint(4) NOT NULL default '0',
	  parentid smallint(5) unsigned NOT NULL DEFAULT '0',
	  title varchar(250) NOT NULL,
	  titlesite varchar(250) DEFAULT '',
	  alias varchar(250) NOT NULL DEFAULT '',
	  description text,
	  descriptionhtml text,
	  image varchar(250) DEFAULT '',
	  viewdescription tinyint(2) NOT NULL DEFAULT '0',
	  weight smallint(5) unsigned NOT NULL DEFAULT '0',
	  sort smallint(5) NOT NULL DEFAULT '0',
	  lev smallint(5) NOT NULL DEFAULT '0',
	  viewfam varchar(50) NOT NULL DEFAULT 'view_location',
	  numsubfam smallint(5) NOT NULL DEFAULT '0',
	  subfid varchar(250) DEFAULT '',
	  inhome tinyint(1) unsigned NOT NULL DEFAULT '0',
	  numlinks tinyint(2) unsigned NOT NULL DEFAULT '3',
	  newday tinyint(2) unsigned NOT NULL DEFAULT '2',
	  featured int(11) NOT NULL DEFAULT '0',
	  keywords text,
	  admins text,
	  add_time int(11) unsigned NOT NULL DEFAULT '0',
	  edit_time int(11) unsigned NOT NULL DEFAULT '0',
	  groups_view varchar(250) DEFAULT '',
	  PRIMARY KEY (fid),
	  UNIQUE KEY alias (alias),
	  KEY parentid (parentid)
	) ENGINE=MyISAM";




$sql_create_module[] = "CREATE TABLE " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_genealogy (
	 id int(11) unsigned NOT NULL auto_increment,
	 fid smallint(5) unsigned NOT NULL default '0',
	 listfid varchar(250) NOT NULL default '',
	 admin_id mediumint(8) unsigned NOT NULL default '0',
	 author varchar(250) default '',
	 patriarch varchar(250) default '',
	 addtime int(11) unsigned NOT NULL default '0',
	 edittime int(11) unsigned NOT NULL default '0',
	 status tinyint(4) NOT NULL default '1',
	 publtime int(11) unsigned NOT NULL default '0',
	 exptime int(11) unsigned NOT NULL default '0',
	 archive tinyint(1) unsigned NOT NULL default '0',
	 title varchar(250) NOT NULL default '',
	 alias varchar(250) NOT NULL default '',
	 hometext text NOT NULL,
	 homeimgfile varchar(250) default '',
	 homeimgalt varchar(250) default '',
	 homeimgthumb tinyint(4) NOT NULL default '0',
	 inhome tinyint(1) unsigned NOT NULL default '0',
	 allowed_comm varchar(250) default '',
	 allowed_rating tinyint(1) unsigned NOT NULL default '0',
	 hitstotal mediumint(8) unsigned NOT NULL default '0',
	 hitscm mediumint(8) unsigned NOT NULL default '0',
	 total_rating int(11) NOT NULL default '0',
	 click_rating int(11) NOT NULL default '0',
	 number int(11) NOT NULL DEFAULT '0',
     years varchar(55) NOT NULL DEFAULT '',
     full_name varchar(250) NOT NULL DEFAULT '',
     telephone varchar(55) NOT NULL DEFAULT '',
     email varchar(200) NOT NULL DEFAULT '',
	 cityid smallint(5) unsigned NOT NULL default '0',
	 districtid smallint(5) unsigned NOT NULL default '0',
	 wardid smallint(5) unsigned NOT NULL default '0',
	 PRIMARY KEY (id),
	 KEY fid (fid),
	 KEY admin_id (admin_id),
	 KEY author (author),
	 KEY title (title),
	 KEY addtime (addtime),
	 KEY publtime (publtime),
	 KEY exptime (exptime),
	 KEY status (status)
	) ENGINE=MyISAM";

$sql_create_module[] = "CREATE TABLE IF NOT EXISTS " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_bodytext (
	 id int(11) unsigned NOT NULL,
	 bodytext mediumtext NOT NULL,
	 ruletext mediumtext NOT NULL,
     contenttext mediumtext NOT NULL,
	 PRIMARY KEY (id)
	) ENGINE=MyISAM";

$sql_create_module[] = "CREATE TABLE IF NOT EXISTS " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_bodyhtml_1 (
	 id int(11) unsigned NOT NULL,
	 bodyhtml longtext NOT NULL,
	 rule longtext NOT NULL,
     content longtext NOT NULL,
	 imgposition tinyint(1) NOT NULL default '1',
	 copyright tinyint(1) NOT NULL default '0',
	 allowed_send tinyint(1) NOT NULL default '0',
	 allowed_print tinyint(1) NOT NULL default '0',
	 allowed_save tinyint(1) NOT NULL default '0',
	 gid mediumint(8) NOT NULL default '0',
	 PRIMARY KEY (id)
	) ENGINE=MyISAM";

$sql_create_module[] = "CREATE TABLE IF NOT EXISTS " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_logs (
	 id mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
	 sid mediumint(8) NOT NULL DEFAULT '0',
	 userid mediumint(8) unsigned NOT NULL DEFAULT '0',
	 status tinyint(4) NOT NULL DEFAULT '0',
	 note varchar(250) NOT NULL,
	 set_time int(11) unsigned NOT NULL DEFAULT '0',
	 PRIMARY KEY (id),
	 KEY sid (sid),
	 KEY userid (userid)
) ENGINE=MyISAM";

$sql_create_module[] = "CREATE TABLE IF NOT EXISTS " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_config_post (
	 group_id smallint(5) NOT NULL,
	 addcontent tinyint(4) NOT NULL,
	 postcontent tinyint(4) NOT NULL,
	 editcontent tinyint(4) NOT NULL,
	 delcontent tinyint(4) NOT NULL,
	 PRIMARY KEY (group_id)
	) ENGINE=MyISAM";

$sql_create_module[] = "CREATE TABLE " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_admins (
	 userid mediumint(8) unsigned NOT NULL default '0',
	 fid smallint(5) NOT NULL default '0',
	 admin tinyint(4) NOT NULL default '0',
	 add_content tinyint(4) NOT NULL default '0',
	 pub_content tinyint(4) NOT NULL default '0',
	 edit_content tinyint(4) NOT NULL default '0',
	 del_content tinyint(4) NOT NULL default '0',
	 app_content tinyint(4) NOT NULL default '0',
	 UNIQUE KEY userid (userid,fid)
	) ENGINE=MyISAM";

$sql_create_module[] = "CREATE TABLE " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_tags (
	 tid mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
	 numnews mediumint(8) NOT NULL DEFAULT '0',
	 alias varchar(250) NOT NULL DEFAULT '',
	 image varchar(250) DEFAULT '',
	 description text,
	 keywords varchar(250) DEFAULT '',
	 PRIMARY KEY (tid),
	 UNIQUE KEY alias (alias)
	) ENGINE=MyISAM";

$sql_create_module[] = "CREATE TABLE " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_tags_id (
	 id int(11) NOT NULL,
	 tid mediumint(9) NOT NULL,
	 keyword varchar(65) NOT NULL,
	 UNIQUE KEY sid (id,tid)
	) ENGINE=MyISAM";
$sql_create_module[] = "CREATE TABLE " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_country(
  countryid smallint(4) unsigned NOT NULL AUTO_INCREMENT,
  code varchar(10) NOT NULL,
  title varchar(255) NOT NULL,
  alias varchar(255) NOT NULL,
  weight smallint(4) unsigned NOT NULL DEFAULT '0',
  status tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (countryid),
  UNIQUE KEY countryid (code)
) ENGINE=MyISAM";

$sql_create_module[] = "CREATE TABLE " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_district(
  districtid mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  code varchar(5) NOT NULL,
  provinceid varchar(5) NOT NULL,
  title varchar(100) NOT NULL,
  alias varchar(100) NOT NULL,
  type varchar(30) NOT NULL,
  location varchar(30) NOT NULL,
  weight mediumint(8) unsigned NOT NULL DEFAULT '0',
  status tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (districtid),
  KEY provinceid (provinceid)
) ENGINE=MyISAM";

$sql_create_module[] = "CREATE TABLE " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_province(
  provinceid mediumint(4) unsigned NOT NULL AUTO_INCREMENT,
  code varchar(5) NOT NULL,
  countryid varchar(10) NOT NULL,
  title varchar(100) NOT NULL,
  alias varchar(100) NOT NULL,
  type varchar(30) NOT NULL,
  weight smallint(4) unsigned NOT NULL DEFAULT '0',
  status tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (provinceid)
) ENGINE=MyISAM";

$sql_create_module[] = "CREATE TABLE " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_ward(
  wardid mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  districtid varchar(5) NOT NULL,
  title varchar(100) NOT NULL,
  alias varchar(100) NOT NULL,
  code varchar(5) NOT NULL,
  type varchar(30) NOT NULL,
  location varchar(30) NOT NULL,
  status tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (wardid),
  UNIQUE KEY alias (alias),
  UNIQUE KEY code (code),
  KEY districtid (districtid)
) ENGINE=MyISAM";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'indexfile', 'view_location')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'per_page', '20')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'st_links', '10')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'homewidth', '100')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'homeheight', '150')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'blockwidth', '52')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'blockheight', '75')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'imagefull', '460')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'copyright', '')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'showtooltip', '1')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'tooltip_position', 'bottom')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'tooltip_length', '150')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'showhometext', '1')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'timecheckstatus', '0')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'show_no_image', '')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'allowed_rating_point', '1')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'facebookappid', '')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'socialbutton', '1')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'alias_lower', '1')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'tags_alias', '0')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'auto_tags', '0')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'tags_remind', '1')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'structure_upload', 'username')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'imgposition', '2')";

// Comments
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'auto_postcomm', '1')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'allowed_comm', '-1')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'view_comm', '6')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'setcomm', '4')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'activecomm', '1')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'emailcomm', '0')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'adminscomm', '')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'sortcomm', '0')";
$sql_create_module[] = "INSERT INTO " . NV_CONFIG_GLOBALTABLE . " (lang, module, config_name, config_value) VALUES ('" . $lang . "', '" . $module_name . "', 'captcha', '1')";

$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(1, 1, 'An', 'An', '', 1, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(2, 1, 'Ân', 'An-2', '', 2, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(3, 1, 'Âu', 'Au', '', 3, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(4, 1, 'Bạc', 'Bac', '', 4, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(5, 1, 'Bạch', 'Bach', '', 5, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(6, 1, 'Bàng', 'Bang', '', 6, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(7, 1, 'Bành', 'Banh', '', 7, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(8, 1, 'Bế', 'Be', '', 8, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(9, 1, 'Biện', 'Bien', '', 9, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(10, 1, 'Bùi', 'Bui', '', 10, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(11, 1, 'Ca', 'Ca', '', 11, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(12, 1, 'Cái', 'Cai', '', 12, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(13, 1, 'Cam', 'Cam', '', 13, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(14, 1, 'Cầm', 'Cam-14', '', 14, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(15, 1, 'Cấn', 'Can', '', 15, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(16, 1, 'Cao', 'Cao', '', 16, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(17, 1, 'Cát', 'Cat', '', 17, '', 1310921468, 1310921468)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(18, 1, 'Châu', 'Chau', '', 18, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(19, 1, 'Chế', 'Che', '', 19, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(20, 1, 'Chiêm', 'Chiem', '', 20, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(21, 1, 'Chu', 'Chu', '', 21, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(22, 1, 'Chử', 'Chu-22', '', 22, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(23, 1, 'Chung', 'Chung', '', 23, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(24, 1, 'Chương', 'Chuong', '', 24, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(25, 1, 'Cồ', 'Co', '', 25, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(26, 1, 'Cù', 'Cu', '', 26, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(27, 1, 'Cự', 'Cu-27', '', 27, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(28, 1, 'Cung', 'Cung', '', 28, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(29, 1, 'Đái', 'Dai', '', 29, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(30, 1, 'Đàm', 'Dam', '', 30, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(31, 1, 'Đặng', 'Dang', '', 31, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(32, 1, 'Danh', 'Danh', '', 32, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(33, 1, 'Đào', 'Dao', '', 33, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(34, 1, 'Đầu', 'Dau', '', 34, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(35, 1, 'Đậu', 'Dau-35', '', 35, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(36, 1, 'Dềnh (Dình)', 'Denh-Dinh', '', 36, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(37, 1, 'Đèo', 'Deo', '', 37, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(38, 1, 'Diệp', 'Diep', '', 38, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(39, 1, 'Diêu', 'Dieu', '', 39, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(40, 1, 'Điêu', 'Dieu-40', '', 40, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(41, 1, 'Điểu', 'Dieu-41', '', 41, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(42, 1, 'Đinh', 'Dinh', '', 42, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(43, 1, 'Đô', 'Do', '', 43, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(44, 1, 'Đồ', 'Do-44', '', 44, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(45, 1, 'Đỗ', 'Do-45', '', 45, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(46, 1, 'Doãn', 'Doan', '', 46, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(47, 1, 'Đoàn', 'Doan-47', '', 47, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(48, 1, 'Đống', 'Dong', '', 48, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(49, 1, 'Đồng', 'Dong-49', '', 49, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(50, 1, 'Đổng', 'Dong-50', '', 50, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(51, 1, 'Dư', 'Du', '', 51, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(52, 1, 'Duôn Du', 'Duon-Du', '', 52, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(53, 1, 'Dương', 'Duong', '', 53, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(54, 1, 'Eban', 'Eban', '', 54, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(55, 1, 'Enoul', 'Enoul', '', 55, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(56, 1, 'Giản', 'Gian', '', 56, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(57, 1, 'Giang', 'Giang', '', 57, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(58, 1, 'Giao', 'Giao', '', 58, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(59, 1, 'Giáp', 'Giap', '', 59, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(60, 1, 'Hà', 'Ha', '', 60, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(61, 1, 'Hạ', 'Ha-61', '', 61, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(62, 1, 'Hàm', 'Ham', '', 62, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(63, 1, 'Hào (Hầu)', 'Hao-Hau', '', 63, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(64, 1, 'Hò', 'Ho', '', 64, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(65, 1, 'Hồ', 'Ho-65', '', 65, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(66, 1, 'Hoa', 'Hoa', '', 66, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(67, 1, 'Hoài', 'Hoai', '', 67, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(68, 1, 'Hoàng', 'Hoang', '', 68, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(69, 1, 'Hồng', 'Hong', '', 69, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(70, 1, 'Hứa', 'Hua', '', 70, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(71, 1, 'Hui', 'Hui', '', 71, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(72, 1, 'Hùng', 'Hung', '', 72, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(73, 1, 'Huỳnh', 'Huynh', '', 73, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(74, 1, 'Kha', 'Kha', '', 74, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(75, 1, 'Khiên', 'Khien', '', 75, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(76, 1, 'Khiếu', 'Khieu', '', 76, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(77, 1, 'Khổng', 'Khong', '', 77, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(78, 1, 'Khu', 'Khu', '', 78, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(79, 1, 'Khuất', 'Khuat', '', 79, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(80, 1, 'Khúc', 'Khuc', '', 80, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(81, 1, 'Khương', 'Khuong', '', 81, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(82, 1, 'Khưu', 'Khuu', '', 82, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(83, 1, 'Kiên', 'Kien', '', 83, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(84, 1, 'Kiều', 'Kieu', '', 84, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(85, 1, 'Kiểu', 'Kieu-85', '', 85, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(86, 1, 'Kim', 'Kim', '', 86, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(87, 1, 'Knui', 'Knui', '', 87, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(88, 1, 'Ksor', 'Ksor', '', 88, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(89, 1, 'Kỷ', 'Ky', '', 89, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(90, 1, 'La', 'La', '', 90, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(91, 1, 'Lã', 'La-91', '', 91, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(92, 1, 'Lai', 'Lai', '', 92, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(93, 1, 'Lại', 'Lai-93', '', 93, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(94, 1, 'Lâm', 'Lam', '', 94, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(95, 1, 'Lang', 'Lang', '', 95, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(96, 1, 'Lành', 'Lanh', '', 96, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(97, 1, 'Lầu', 'Lau', '', 97, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(98, 1, 'Lê', 'Le', '', 98, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(99, 1, 'Lều', 'Leu', '', 99, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(100, 1, 'Liên', 'Lien', '', 100, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(101, 1, 'Liêu', 'Lieu', '', 101, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(102, 1, 'Liễu', 'Lieu-102', '', 102, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(103, 1, 'Linh', 'Linh', '', 103, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(104, 1, 'Lò', 'Lo', '', 104, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(105, 1, 'Lô', 'Lo-105', '', 105, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(106, 1, 'Lợi', 'Loi', '', 106, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(107, 1, 'Lù', 'Lu', '', 107, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(108, 1, 'Lư', 'Lu-108', '', 108, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(109, 1, 'Lữ', 'Lu-109', '', 109, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(110, 1, 'Lương', 'Luong', '', 110, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(111, 1, 'Lưu', 'Luu', '', 111, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(112, 1, 'Luyện', 'Luyen', '', 112, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(113, 1, 'Lý', 'Ly', '', 113, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(114, 1, 'Ma', 'Ma', '', 114, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(115, 1, 'Mã', 'Ma-115', '', 115, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(116, 1, 'Mạc', 'Mac', '', 116, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(117, 1, 'Mạch', 'Mach', '', 117, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(118, 1, 'Mai', 'Mai', '', 118, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(119, 1, 'Man Thiên', 'Man-Thien', '', 119, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(120, 1, 'Mạnh', 'Manh', '', 120, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(121, 1, 'Mậu', 'Mau', '', 121, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(122, 1, 'Miên', 'Mien', '', 122, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(123, 1, 'Ngạc', 'Ngac', '', 123, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(124, 1, 'Ngân', 'Ngan', '', 124, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(125, 1, 'Nghê', 'Nghe', '', 125, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(126, 1, 'Nghiêm', 'Nghiem', '', 126, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(127, 1, 'Ngô', 'Ngo', '', 127, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(128, 1, 'Ngọ', 'Ngo-128', '', 128, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(129, 1, 'Ngũ', 'Ngu', '', 129, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(130, 1, 'Ngụy', 'Nguy', '', 130, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(131, 1, 'Nguyễn', 'Nguyen', '', 131, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(132, 1, 'Nhạc', 'Nhac', '', 132, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(133, 1, 'Nhan', 'Nhan', '', 133, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(134, 1, 'Nhân', 'Nhan-134', '', 134, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(135, 1, 'Nhữ', 'Nhu', '', 135, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(136, 1, 'Ninh', 'Ninh', '', 136, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(137, 1, 'Nông', 'Nong', '', 137, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(138, 1, 'Nùng', 'Nung', '', 138, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(139, 1, 'On', 'On', '', 139, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(140, 1, 'Ôn', 'On-140', '', 140, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(141, 1, 'Ông', 'Ong', '', 141, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(142, 1, 'Pản', 'Pan', '', 142, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(143, 1, 'Phẩm', 'Pham', '', 143, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(144, 1, 'Phạm', 'Pham-144', '', 144, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(145, 1, 'Phan', 'Phan', '', 145, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(146, 1, 'Phí', 'Phi', '', 146, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(147, 1, 'Phú', 'Phu', '', 147, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(148, 1, 'Phù', 'Phu-148', '', 148, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(149, 1, 'Phùng', 'Phung', '', 149, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(150, 1, 'Phương', 'Phuong', '', 150, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(151, 1, 'Quách', 'Quach', '', 151, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(152, 1, 'Quan', 'Quan', '', 152, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(153, 1, 'Quảng', 'Quang', '', 153, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(154, 1, 'Quyền', 'Quyen', '', 154, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(155, 1, 'Sầm', 'Sam', '', 155, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(156, 1, 'Sĩ', 'Si', '', 156, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(157, 1, 'Sơn', 'Son', '', 157, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(158, 1, 'Sử', 'Su', '', 158, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(159, 1, 'Tạ', 'Ta', '', 159, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(160, 1, 'Tân', 'Tan', '', 160, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(161, 1, 'Tấn', 'Tan-161', '', 161, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(162, 1, 'Tan (Tang)', 'Tan-Tang', '', 162, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(163, 1, 'Tăng', 'Tang', '', 163, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(164, 1, 'Thạch', 'Thach', '', 164, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(165, 1, 'Thái', 'Thai', '', 165, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(166, 1, 'Thẩm', 'Tham', '', 166, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(167, 1, 'Thân', 'Than', '', 167, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(168, 1, 'Thang', 'Thang', '', 168, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(169, 1, 'Thành', 'Thanh', '', 169, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(170, 1, 'Thảo', 'Thao', '', 170, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(171, 1, 'Thi', 'Thi', '', 171, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(172, 1, 'Thiều', 'Thieu', '', 172, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(173, 1, 'Thông', 'Thong', '', 173, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(174, 1, 'Thục', 'Thuc', '', 174, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(175, 1, 'Tiết', 'Tiet', '', 175, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(176, 1, 'Tiêu', 'Tieu', '', 176, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(177, 1, 'Tô', 'To', '', 177, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(178, 1, 'Tôn', 'Ton', '', 178, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(179, 1, 'Tôn Thất', 'Ton-That', '', 179, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(180, 1, 'Tống', 'Tong', '', 180, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(181, 1, 'Trà', 'Tra', '', 181, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(182, 1, 'Trác', 'Trac', '', 182, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(183, 1, 'Trầm', 'Tram', '', 183, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(184, 1, 'Trần', 'Tran', '', 184, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(185, 1, 'Trang', 'Trang', '', 185, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(186, 1, 'Triệu', 'Trieu', '', 186, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(187, 1, 'Trình', 'Trinh', '', 187, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(188, 1, 'Trịnh', 'Trinh-188', '', 188, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(189, 1, 'Trưng', 'Trung', '', 189, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(190, 1, 'Trương', 'Truong', '', 190, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(191, 1, 'Từ', 'Tu', '', 191, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(192, 1, 'Tướng', 'Tuong', '', 192, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(193, 1, 'Tường', 'Tuong-193', '', 193, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(194, 1, 'Tưởng', 'Tuong-194', '', 194, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(195, 1, 'Ủ', 'U', '', 195, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(196, 1, 'Ung', 'Ung', '', 196, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(197, 1, 'Ứng', 'Ung-197', '', 197, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(198, 1, 'Uông', 'Uong', '', 198, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(199, 1, 'Uyển', 'Uyen', '', 199, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(200, 1, 'Vân', 'Van', '', 200, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(201, 1, 'Văn', 'Van-201', '', 201, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(202, 1, 'Vận', 'Van-202', '', 202, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(203, 1, 'Vi', 'Vi', '', 203, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(204, 1, 'Viêm', 'Viem', '', 204, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(205, 1, 'Viên', 'Vien', '', 205, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(206, 1, 'Võ', 'Vo', '', 206, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(207, 1, 'Vũ', 'Vu', '', 207, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(208, 1, 'Vương', 'Vuong', '', 208, '', 1310921469, 1310921469)";
$sql_create_module[] = "INSERT INTO " . $db_config['prefix'] . "_" . $lang . "_" . $module_data . "_family (fid, status, title, alias, description, weight, keywords, add_time, edit_time) VALUES(209, 1, 'Vưu', 'Vuu', '', 209, '', 1310921469, 1310921469)";