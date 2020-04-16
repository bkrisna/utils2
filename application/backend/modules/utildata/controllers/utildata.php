<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
class Utildata extends MY_Controller {

	function __construct() {
        parent::__construct();
        $this->load->model('Report_model');
		$this->load->model('Utildata_model');
		$this->load->model('Exabox_model');
		$this->load->model('Exaserver_model');
		$this->load->model('Zfssa_model');
    }

	/**
	*
	* READ/RETRIEVE items
	*
	* @return json encoded array (items)
	*/
	
	public function index() {
		echo "blah";
	}
	
	private function getMonthString($m, $full=false) {
		switch ($m) {
			case '1':
				return (!$full) ? "Jan" : "Januari";
				break;
			case '2':
				return (!$full) ? "Feb" : "Februari";
				break;
			case '3':
				return (!$full) ? "Mar" : "Maret";
				break;
			case '4':
				return (!$full) ? "Apr" : "April";
				break;
			case '5':
				return (!$full) ? "May" : "May";
				break;
			case '6':
				return (!$full) ? "Jun" : "Juni";
				break;
			case '7':
				return (!$full) ? "Jul" : "Juli";
				break;
			case '8':
				return (!$full) ? "Aug" : "Agustus";
				break;
			case '9':
				return (!$full) ? "Sep" : "September";
				break;
			case '10':
				return (!$full) ? "Sep" : "October";
				break;
			case '11':
				return (!$full) ? "Nov" : "November";
				break;
			case '12':
				return (!$full) ? "Dec" : "Desember";
				break;
			default :
				return "Not a number";
		}
	}
	
	public function getReportId() {
		date_default_timezone_set("Asia/Jakarta");
		$mm = $this->input->get('mm', TRUE) > '' ? $this->input->get('mm', TRUE) : (date("m") - 1);
		$yy = $this->input->get('yy', TRUE) > '' ? $this->input->get('yy', TRUE) : date("Y");
		$report_alias = $this->getMonthString((int)$mm) . ' ' . $yy;
		
		$entries = $this->Report_model->get_id_by_alias($report_alias);
		
		if ($entries) {
			$count = isset($entries) ? count($entries) : 0;
			$data['success'] = true;
	   	 	$data['total'] = $count;
	   	 	$data['items'] = $entries;
		} else {
			$data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Laporan tidak ditemukan. Silahkan ulangi kembali.';
		}

	    extjs_output($data);
	}
	
	public function createReport() {
		date_default_timezone_set("Asia/Jakarta");
		$mm = $this->input->get('mm', TRUE) > '' ? $this->input->get('mm', TRUE) : (date("m") - 1);
		$yy = $this->input->get('yy', TRUE) > '' ? $this->input->get('yy', TRUE) : date("Y");
		$title = $this->input->get('title', TRUE) > '' ? $this->input->get('title', TRUE) : '';
		$today = date("Y-m-d H:i:s");
		$report_alias = $this->getMonthString((int)$mm) . ' ' . $yy;
		$report_name = "Exalogic Utilization Report " . $this->getMonthString((int)$mm, true) . ' ' . $yy;
		
		$exist = $this->Report_model->get_entry(array('report_alias' => $report_alias));
		if ($exist) {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Tidak dapat menambahkan laporan. Laporan sudah ada.';
		} else {
	        $item_data = array(
	            'report_name' => $report_name,
	        	'report_alias' => $report_alias,
	            'date_created' => $today,
	            'last_update' => $today
	        );
		    $insert = $this->Report_model->insert_entry($item_data);
		    if (intval($insert)) {
		        $item_data['report_id'] = $insert;
		        $data['success'] = true;
		        $data['total'] = 1;
		        $data['items'] = $item_data;
		    } else {
		        $data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Telah terjadi kesalahan pada database. Silahkan ulangi kembali.';
		    }
	    }
		extjs_output($data);
	}
	
	public function deleteReport() {
		date_default_timezone_set("Asia/Jakarta");
		$mm = $this->input->get('mm', TRUE) > '' ? $this->input->get('mm', TRUE) : (date("m") - 1);
		$yy = $this->input->get('yy', TRUE) > '' ? $this->input->get('yy', TRUE) : date("Y");
		$title = $this->input->get('title', TRUE) > '' ? $this->input->get('title', TRUE) : '';
		$today = date("Y-m-d H:i:s");
		$report_alias = $this->getMonthString((int)$mm) . ' ' . $yy;
		
		$exist = $this->Report_model->get_entry(array('report_alias' => $report_alias));
		if ($exist) {
			foreach ($exist as $itm) {
				$report_id = $itm->report_id;
			}
			$del = $this->Report_model->delete_entry(array('report_id' => $report_id));
			if ($del) {
		        $item_data['message'] = 'Laporan telah di hapus';
		        $data['success'] = true;
		        $data['total'] = 1;
		        $data['items'] = $item_data;
			} else {
		        $data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Telah terjadi kesalahan pada database. Silahkan ulangi kembali.';
			}
		} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Tidak dapat menghapus laporan. Laporan tidak ditemukan.';
		}
		extjs_output($data);
	}
	
	public function getData() {
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : '';
		$server_name = $this->input->get('servername', TRUE) > '' ? $this->input->get('servername', TRUE) : '';
		$vmname = $this->input->get('vmname', TRUE) > '' ? $this->input->get('vmname', TRUE) : '';
		$hostname = $this->input->get('hostname', TRUE) > '' ? $this->input->get('hostname', TRUE) : '';
		
		$server_id = $this->Exaserver_model->get_id_by_name($server_name);
		if ($server_id) {
			$data_filter = array (
				'report_id' => $report_id, 
				'server_id' => $server_id,
				'vmname' => $vmname,
				'hostname' => $hostname
			);
		
			$entries = $this->Utildata_model->get_entry($data_filter);
		
			if ($entries) {
				$count = isset($entries) ? count($entries) : 0;
				$data['success'] = true;
		   	 	$data['total'] = $count;
		   	 	$data['items'] = $entries;
			} else {
				$data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Utilisasi data tidak ditemukan. Silahkan ulangi kembali.';
			}
		} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Exalogic server tidak ditemukan. Silahkan ulangi kembali.';
		}

	    extjs_output($data);
		
	}
	
	public function insertData() {
		
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : '';
		$server_name = $this->input->get('servername', TRUE) > '' ? $this->input->get('servername', TRUE) : '';
		$vmname = $this->input->get('vmname', TRUE) > '' ? $this->input->get('vmname', TRUE) : '';
		$hostname = $this->input->get('hostname', TRUE) > '' ? $this->input->get('hostname', TRUE) : '';
		
		$server_id = $this->Exaserver_model->get_id_by_name($server_name);
		if ($server_id) {
			$data_filter = array (
				'report_id' => $report_id, 
				'server_id' => $server_id,
				'vmname' => $vmname,
				'hostname' => $hostname
			);
			
			$is_data_exist = $this->Utildata_model->get_entry($data_filter);
			if (!$is_data_exist) {
				$new_data = array(
					'report_id' => $report_id,
					'server_id' => $server_id,
					'vmname' => $vmname,
					'vcpu' => $this->input->get('vcpu', TRUE) > '' ? $this->input->get('vcpu', TRUE) : 0,
					'memory' => $this->input->get('memory', TRUE) > '' ? $this->input->get('memory', TRUE) : 0,
					'osstor' => $this->input->get('osstor', TRUE) > '' ? $this->input->get('osstor', TRUE) : 0,
					'attachedstor' => $this->input->get('attachedstor', TRUE) > '' ? $this->input->get('attachedstor', TRUE) : 0,
					'ipaddress' => $this->input->get('ipaddress', TRUE) > '' ? $this->input->get('ipaddress', TRUE) : '',
					'hostname' => $hostname,
					'os' => $this->input->get('os', TRUE) > '' ? $this->input->get('os', TRUE) : '',
					'env' => $this->input->get('env', TRUE) > '' ? $this->input->get('env', TRUE) : '',
					'note' => $this->input->get('note', TRUE) > '' ? $this->input->get('note', TRUE) : '',
					'state'=> $this->input->get('state', TRUE)> '' ? $this->input->get('state', TRUE) : ''
				);
				$qs = $this->Utildata_model->insert_entry($new_data);
				if ($qs) {
					$res = array ('data_id' => $qs);
			        $data['success'] = true;
			        $data['total'] = 1;
			        $data['items'] = $res;
				} else {
			        $data['success'] = false;
			        $data['title'] = 'Error';
			        $data['message'] = 'Gagal insert data. Silahkan ulangi kembali.';
				}
				
			} else {
		        $data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Gagal insert data. Data sudah tersedia dalam database. Silahkan ulangi kembali.';
			}
		} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Exalogic server tidak ditemukan. Gagal insert data. Silahkan ulangi kembali.';
		}	
		
		extjs_output($data);
	}
	
	public function updateData() {
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : '';
		//$server_name = $this->input->get('servername', TRUE) > '' ? $this->input->get('servername', TRUE) : '';
		$vmname = $this->input->get('vmname', TRUE) > '' ? $this->input->get('vmname', TRUE) : '';
		$hostname = $this->input->get('hostname', TRUE) > '' ? $this->input->get('hostname', TRUE) : '';
		
		//$server_id = $this->Exaserver_model->get_id_by_name($server_name);
		//if ($server_id) {
			$data_filter = array (
				'report_id' => $report_id,
				'vmname' => $vmname,
				'hostname' => $hostname
			);
			
			$is_data_exist = $this->Utildata_model->get_entry($data_filter);
			
			if ($is_data_exist) {
				$new_data = array();
					
				if ( $this->input->get('vcpu', TRUE) > '' ) {
					$new_data['vcpu'] = $this->input->get('vcpu', TRUE);
				} 
				if ($this->input->get('memory', TRUE) > '' ) {
					$new_data['memory'] = $this->input->get('memory', TRUE);
				} 
				if ($this->input->get('osstor', TRUE) > '' ) {
					$new_data['osstor'] = $this->input->get('osstor', TRUE);
				}
				if ($this->input->get('attachedstor', TRUE) > '' ) {
					$new_data['attachedstor'] = $this->input->get('attachedstor', TRUE);
				}
				if ($this->input->get('ipaddress', TRUE) > '' ) {
					$new_data['ipaddress'] = $this->input->get('ipaddress', TRUE);
				}
				if ($this->input->get('os', TRUE) > '' ) {
					$new_data['os'] = $this->input->get('os', TRUE);
				}
				if ($this->input->get('env', TRUE) > '' ) {
					$new_data['env'] = $this->input->get('env', TRUE);
				}
				if ($this->input->get('note', TRUE) > '' ) {
					$new_data['note'] = $this->input->get('note', TRUE);
				}
				if ($this->input->get('state', TRUE) > '' ) {
					$new_data['state'] = $this->input->get('state', TRUE);
				}
				
				$qs = $this->Utildata_model->update_entry($data_filter, $new_data);
				if ($qs) {
					$res = array('message' => 'Update data berhasil');
			        $data['success'] = true;
			        $data['total'] = 1;
			        $data['items'] = $res;
				} else {
			        $data['success'] = false;
			        $data['title'] = 'Error';
			        $data['message'] = 'Gagal update data. Silahkan ulangi kembali.';
				}
				
			} else {
		        $data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Gagal update data. Data tidak tersedia dalam database. Silahkan ulangi kembali.';
			}
			/*} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Exalogic server tidak ditemukan. Gagal insert data. Silahkan ulangi kembali.';
		}*/	
		
		extjs_output($data);
	}
	
	public function deleteData() {
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : '';
		$server_name = $this->input->get('servername', TRUE) > '' ? $this->input->get('servername', TRUE) : '';
		$vmname = $this->input->get('vmname', TRUE) > '' ? $this->input->get('vmname', TRUE) : '';
		$hostname = $this->input->get('hostname', TRUE) > '' ? $this->input->get('hostname', TRUE) : '';
		
		$server_id = $this->Exaserver_model->get_id_by_name($server_name);
		if ($server_id) {
			$data_filter = array (
				'report_id' => $report_id, 
				'server_id' => $server_id,
				'vmname' => $vmname,
				'hostname' => $hostname
			);
			
			$del = $this->Utildata_model->delete_entry($data_filter);
			if ($del) {
		        $item_data['message'] = 'Utilisasi data telah di hapus';
		        $data['success'] = true;
		        $data['total'] = 1;
		        $data['items'] = $item_data;
			} else {
		        $data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Telah terjadi kesalahan pada database. Silahkan ulangi kembali.';
			}
		} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Exalogic server tidak ditemukan. Gagal delete data. Silahkan ulangi kembali.';
		}	
		
		extjs_output($data);
	}
	
	public function getData2() {
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : '';
		$vmname = $this->input->get('vmname', TRUE) > '' ? $this->input->get('vmname', TRUE) : '';
		$hostname = $this->input->get('hostname', TRUE) > '' ? $this->input->get('hostname', TRUE) : '';
		
		$data_filter = array (
			'report_id' => $report_id, 
			'vmname' => $vmname,
			'hostname' => $hostname
		);
	
		$entries = $this->Utildata_model->get_entry($data_filter);
	
		if ($entries) {
			$count = isset($entries) ? count($entries) : 0;
			$data['success'] = true;
	   	 	$data['total'] = $count;
	   	 	$data['items'] = $entries;
		} else {
			$data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Utilisasi data tidak ditemukan. Silahkan ulangi kembali.';
		}

	    extjs_output($data);
		
	}
	
	public function getExaBoxes() {
		$entries = $this->Exabox_model->get_all_entries();
		
		if ($entries) {
			$count = isset($entries) ? count($entries) : 0;
			$data['success'] = true;
	   	 	$data['total'] = $count;
	   	 	$data['items'] = $entries;
		} else {
			$data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Laporan tidak ditemukan. Silahkan ulangi kembali.';
		}

	    extjs_output($data);
	}
	
	public function insertZfssaData() {
		
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : '';
		$box_id = $this->input->get('box_id', TRUE) > '' ? $this->input->get('box_id', TRUE) : '';
		$data_filter = array (
			'report_id' => $report_id, 
			'box_id' => $server_id
		);
		
		$is_data_exist = $this->Zfssa_model->get_entry($data_filter);
		if (!$is_data_exist) {
			$new_data = array(
				'report_id' => $report_id,
				'box_id' => $box_id,
				'total_size' => $this->input->get('total_size', TRUE) > '' ? $this->input->get('total_size', TRUE) : 0,
				'used_size' => $this->input->get('used_size', TRUE) > '' ? $this->input->get('used_size', TRUE) : 0,
				'free_size' => $this->input->get('free_size', TRUE) > '' ? $this->input->get('free_size', TRUE) : 0
			);
			$qs = $this->Zfssa_model->insert_entry($new_data);
			if ($qs) {
				$res = array ('data_id' => $qs);
		        $data['success'] = true;
		        $data['total'] = 1;
		        $data['items'] = $res;
			} else {
		        $data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Gagal insert data. Silahkan ulangi kembali.';
			}
			
		} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Gagal insert data. Data sudah tersedia dalam database. Silahkan ulangi kembali.';
		}
		
		extjs_output($data);
	}
}