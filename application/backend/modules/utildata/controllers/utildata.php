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
	
	public function getReport() {
		date_default_timezone_set("Asia/Jakarta");
		$mm = $this->input->get('mm', TRUE) > '' ? $this->input->get('mm', TRUE) : (date("m") - 1);
		$yy = $this->input->get('yy', TRUE) > '' ? $this->input->get('yy', TRUE) : date("Y");
		$report_alias = $this->getMonthString((int)$mm) . ' ' . $yy;
		
		$entries = $this->Report_model->get_entry(array("report_alias" => $report_alias));
		
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
	
	public function updateReport() {
		date_default_timezone_set("Asia/Jakarta");
		$mm = $this->input->get('mm', TRUE) > '' ? $this->input->get('mm', TRUE) : (date("m") - 1);
		$yy = $this->input->get('yy', TRUE) > '' ? $this->input->get('yy', TRUE) : date("Y");
		$report_alias = $this->input->get('report_alias', TRUE) > '' ? $this->input->get('report_alias', TRUE) : $this->getMonthString((int)$mm).' '.$yy;
		$report_name = $this->input->get('report_name', TRUE) > '' ? $this->input->get('report_name', TRUE) : '';
		
		$is_exist = $this->Report_model->get_entry(array('report_alias' => $report_alias));
		if ($is_exist) {
			$old_data = $is_exist['0'];
			
	        $new_data = array(
	            'report_name' => ($old_data->report_name != $report_name) ? $report_name : $old_data->report_name,
	        	'report_alias' => ($old_data->report_alias != $report_alias) ? $report_alias : $old_data->report_alias,
	            'last_update' => date("Y-m-d H:i:s")
	        );
			
			$filter_data = array(
				'report_id' => $old_data->report_id
			);
			
		    $update = $this->Report_model->update_entry($filter_data, $new_data);
		    if ($update) {
		        $item_data['message'] = 'Update data successful';
		        $data['success'] = true;
		        $data['total'] = 1;
		        $data['items'] = $item_data;
		    } else {
		        $data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Database error. Please try again. '.$this->db->_error_message();
		    }
		} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Unable to update report data. Report not found';
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
		        $data['message'] = 'Utilization data not found. Plase try again.';
			}
		} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Unable to get data for this server '.$server_name.'. Please try again.';
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
			        $data['message'] = 'Database error. Unable to insert data. Please try again.';
				}
				
			} else {
		        $data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Unable to insert new data. Data already available in database. Please try again.';
			}
		} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Unable to insert data for server '.$server_name.'. Please try again.';
		}	
		
		extjs_output($data);
	}
	
	public function updateData() {
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : '';
		$vmname = $this->input->get('vmname', TRUE) > '' ? $this->input->get('vmname', TRUE) : '';
		$hostname = $this->input->get('hostname', TRUE) > '' ? $this->input->get('hostname', TRUE) : '';
		
		$vcpu = $this->input->get('vcpu', TRUE) > '' ? $this->input->get('vcpu', TRUE) : 0;
		$memory = $this->input->get('memory', TRUE) > '' ? $this->input->get('memory', TRUE) : 0;
		$osstor = $this->input->get('osstor', TRUE) > '' ? $this->input->get('osstor', TRUE) : 0;
		$attachedstor = $this->input->get('attachedstor', TRUE) > '' ? $this->input->get('attachedstor', TRUE) : 0;
		$ipaddress = $this->input->get('ipaddress', TRUE) > '' ? $this->input->get('ipaddress', TRUE) : 0;
		$os = $this->input->get('os', TRUE) > '' ? $this->input->get('os', TRUE) : '';
		$env = $this->input->get('env', TRUE) > '' ? $this->input->get('env', TRUE) : '';
		$note = $this->input->get('note', TRUE) > '' ? $this->input->get('note', TRUE) : '';
		$state = $this->input->get('state', TRUE) > '' ? $this->input->get('state', TRUE) : '';
		
		$data_filter = array (
			'report_id' => $report_id,
			'vmname' => $vmname,
			'hostname' => $hostname
		);
		
		$is_data_exist = $this->Utildata_model->get_entry($data_filter);
		
		if ($is_data_exist) {
			
			$old_data = $is_data_exist['0'];
			
			$filter = array( 
				'id' => $old_data->id 
			);
			
			$new_data = array();
			
			if ($this->input->get('vcpu', TRUE) > '') {
				$new_data['vcpu'] = ($vcpu != $old_data->vcpu) ? $vcpu : $old_data->vcpu;
			}
			
			if ($this->input->get('memory', TRUE) > '') {
				$new_data['memory'] = ($memory != $old_data->memory) ? $memory : $old_data->memory;
			}
			
			if ($this->input->get('osstor', TRUE) > '') {
				$new_data['osstor'] = ($osstor != $old_data->osstor) ? $osstor : $old_data->osstor;
			}
			
			if ($this->input->get('attachedstor', TRUE) > '') {
				$new_data['attachedstor'] = ($attachedstor != $old_data->attachedstor) ? $attachedstor : $old_data->attachedstor;
			}
			
			if ($this->input->get('ipaddress', TRUE) > '') {
				$new_data['ipaddress'] = ($ipaddress != $old_data->ipaddress) ? $ipaddress : $old_data->ipaddress;
			}
			
			if ($this->input->get('os', TRUE) > '') {
				$new_data['os'] = ($os != $old_data->os) ? $os : $old_data->os;
			}
			
			if ($this->input->get('env', TRUE) > '') {
				$new_data['env'] = ($env != $old_data->env) ? $env : $old_data->env;
			}
			
			if ($this->input->get('note', TRUE) > '') {
				$new_data['note'] = ($note != $old_data->note) ? $note : $old_data->note;
			}
			
			if ($this->input->get('state', TRUE) > '') {
				$new_data['state'] = ($state != $old_data->state) ? $state : $old_data->state;
			}
			
			
			$qs = $this->Utildata_model->update_entry($filter, $new_data);
			if ($qs) {
				$res = array('message' => 'Data updated');
		        $data['success'] = true;
		        $data['total'] = 1;
		        $data['items'] = $res;
			} else {
		        $data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Unable to update data. Please try again .';
			}
			
		} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Unable to update data. Data not found. Please try again.';
		}
		
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
		        $item_data['message'] = 'Utilisasi data has been deleted';
		        $data['success'] = true;
		        $data['total'] = 1;
		        $data['items'] = $item_data;
			} else {
		        $data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Unable to delete utilization data. Please try again.';
			}
		} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Unable to delete utilization data for server '.$server_name.'. Please try again.';
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
	
	public function getZfssaData() {
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : '';
		$box_id = $this->input->get('box_id', TRUE) > '' ? $this->input->get('box_id', TRUE) : '';
		
		$data_filter = array (
			'report_id' => $report_id, 
			'box_id' => $box_id
		);
	
		$entries = $this->Zfssa_model->get_entry($data_filter);
	
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
	
	public function updateZfssaData() {
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : '';
		$box_id = $this->input->get('box_id', TRUE) > '' ? $this->input->get('box_id', TRUE) : '';
		
		$data_filter = array (
			'report_id' => $report_id,
			'box_id' => $box_id
		);
		
		$is_data_exist = $this->Zfssa_model->get_entry($data_filter);
		
		if ($is_data_exist) {
			$old_data = $is_data_exist['0'];
			$new_data = array();
			
			$filter = array (
				'id' => $old_data->id
			);
			
			$new_data = array (
				'report_id' => $report_id,
				'box_id' => $box_id,
				'total_size' => ($this->input->get('total_size', TRUE) != $old_data->total_size) ? $this->input->get('total_size', TRUE) : $old_data->total_size,
				'used_size' => ($this->input->get('used_size', TRUE) != $old_data->used_size) ? $this->input->get('used_size', TRUE) : $old_data->used_size,
				'free_size' => ($this->input->get('free_size', TRUE) != $old_data->free_size) ? $this->input->get('free_size', TRUE) : $old_data->free_size
			);
			
			$qs = $this->Zfssa_model->update_entry($filter, $new_data);
			if ($qs) {
				$res = array('message' => 'Data Updated');
		        $data['success'] = true;
		        $data['total'] = 1;
		        $data['items'] = $res;
			} else {
		        $data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Unable to update data. Please try again.';
			}
			
		} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Data not found. Unable to update data. Please try again.';
		}
		
		extjs_output($data);
	}
	
	public function deleteZfssaData() {
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : '';
		$box_id = $this->input->get('box_id', TRUE) > '' ? $this->input->get('box_id', TRUE) : '';
		
		$data_filter = array (
			'report_id' => $report_id,
			'box_id' => $box_id
		);
		
		$is_data_exist = $this->Zfssa_model->get_entry($data_filter);
		
		if ($is_data_exist) {
			$old_data = $is_data_exist['0'];
			
			$filter = array (
				'id' => $old_data->id
			);
			
			$del = $this->Zfssa_model->delete_entry($data_filter);
			if ($del) {
		        $item_data['message'] = 'Data has been deleted';
		        $data['success'] = true;
		        $data['total'] = 1;
		        $data['items'] = $item_data;
			} else {
		        $data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Unable to delete data. Please try again.';
			}
		} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Data not found. Unable to delete data. Please try again.';
		}
		
		extjs_output($data);
	}
}