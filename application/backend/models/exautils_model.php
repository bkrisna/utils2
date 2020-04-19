<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Exautils_model extends CI_Model {

	private $table;
	private $table_fields;
	private $table_fields_join;

    function __construct() {
		$this->load->database();
        parent::__construct();
    }
	
	function get_report_list_count() {
		$qs = 'select count(report_id) as row_cnt from utils_report';
		$query = $this->db->query($qs);
		if ($query->num_rows() > 0) {
			return $query->row()->row_cnt;
		} else {
			return 0;
		}
	}
	
	function get_report_list() {
		$qs = 'select report_id, report_name from utils_report';
		$query = $this->db->query($qs);
		if ($query->num_rows() > 0) {
			$dt = array();
			foreach ($query->result() as $itm) {
				$i['report_id'] = $itm->report_id;
				$i['report_name'] = $itm->report_name;
				array_push($dt, $i);
			}
			return $dt;
		} else {
			return NULL;
		}
	}
	
	function get_box_utils_count($report_id, $env) {
		$qs = 'SELECT distinct(exalogic_boxes.id) as row_cnt FROM utilsdb.hosts_utils JOIN exalogic_boxes ON hosts_utils.box_id = exalogic_boxes.id WHERE exalogic_boxes.box_env = ? AND hosts_utils.report_id = ? GROUP BY hosts_utils.box_id, hosts_utils.report_id';
		$query = $this->db->query($qs, array($env, $report_id));
		if ($query->num_rows() > 0) {
			return $query->num_rows();
		} else {
			return 0;
		}
	}
	
    function get_box_utils($report_id, $env) {
		$qs = 'SELECT box_utils.*,  zfssa_data.total_size as total_zfssa, zfssa_data.used_size as used_zfssa, zfssa_data.free_size as free_zfssa FROM  box_utils JOIN zfssa_data ON box_utils.box_id = zfssa_data.box_id AND box_utils.report_id = zfssa_data.report_id where box_utils.report_id = ? and box_utils.box_env = ?';
		$query = $this->db->query($qs, array($report_id, $env));
		if ($query->num_rows() > 0) {
			$dt = array();
			foreach ($query->result() as $itm) {
				$i['report_id'] = $itm->report_id;
				$i['box_id'] = $itm->box_id;
				$i['box_name'] = $itm->box_name;
				$i['box_alias'] = $itm->box_alias;
				$i['total_vcpu'] = $itm->total_box_vcpu;
				$i['used_vcpu'] = $itm->used_box_vcpu;
				$i['used_vcpu_pct'] = round(($itm->used_box_vcpu/$itm->total_box_vcpu) * 100);
				$i['free_vcpu'] = $itm->total_box_vcpu - $itm->used_box_vcpu;
				$i['free_vcpu_pct'] = round((($itm->total_box_vcpu - $itm->used_box_vcpu)/$itm->total_box_vcpu) * 100);
				$i['total_mem'] = $itm->total_box_mem;
				$i['used_mem'] = $itm->used_box_mem;
				$i['used_mem_pct'] = round(($itm->used_box_mem/$itm->total_box_mem) * 100);
				$i['free_mem'] = $itm->total_box_mem - $itm->used_box_mem;
				$i['free_mem_pct'] = round((($itm->total_box_mem - $itm->used_box_mem)/$itm->total_box_mem) * 100);
				$i['total_zfssa'] = $itm->total_zfssa;
				$i['used_zfssa'] = $itm->used_zfssa;
				$i['used_zfssa_pct'] = round(($itm->used_zfssa/$itm->total_zfssa) * 100);
				$i['free_zfssa'] = $itm->free_zfssa;
				$i['free_zfssa_pct'] = round(($itm->free_zfssa/$itm->total_zfssa) * 100);
				array_push($dt, $i);
			}
			return $dt;
		} else {
			return NULL;
		}
    }
	
    function get_box_utils2($report_id, $env) {
		$qs = 'SELECT box_utils.*,  zfssa_data.total_size as total_zfssa, zfssa_data.used_size as used_zfssa, zfssa_data.free_size as free_zfssa FROM  box_utils JOIN zfssa_data ON box_utils.box_id = zfssa_data.box_id AND box_utils.report_id = zfssa_data.report_id where box_utils.report_id = ? and box_utils.box_env = ?';
		$query = $this->db->query($qs, array($report_id, $env));
		if ($query->num_rows() > 0) {
			$dt = array();
			foreach ($query->result() as $itm) {
				$i['report_id'] = $itm->report_id;
				$i['box_id'] = $itm->box_id;
				$i['box_name'] = $itm->box_name;
				$i['box_alias'] = $itm->box_alias;
				$i['total_vcpu'] = $itm->total_box_vcpu;
				$i['used_vcpu'] = $itm->used_box_vcpu;
				$i['used_vcpu_pct'] = round(($itm->used_box_vcpu/$itm->total_box_vcpu) * 100);
				$i['free_vcpu'] = $itm->total_box_vcpu - $itm->used_box_vcpu;
				$i['free_vcpu_pct'] = round((($itm->total_box_vcpu - $itm->used_box_vcpu)/$itm->total_box_vcpu) * 100);
				$i['total_mem'] = $itm->total_box_mem;
				$i['used_mem'] = $itm->used_box_mem;
				$i['used_mem_pct'] = round(($itm->used_box_mem/$itm->total_box_mem) * 100);
				$i['free_mem'] = $itm->total_box_mem - $itm->used_box_mem;
				$i['free_mem_pct'] = round((($itm->total_box_mem - $itm->used_box_mem)/$itm->total_box_mem) * 100);
				$i['total_zfssa'] = $itm->total_zfssa;
				$i['used_zfssa'] = $itm->used_zfssa;
				$i['used_zfssa_pct'] = round(($itm->used_zfssa/$itm->total_zfssa) * 100);
				$i['free_zfssa'] = $itm->free_zfssa;
				$i['free_zfssa_pct'] = round(($itm->free_zfssa/$itm->total_zfssa) * 100);
				array_push($dt, $i);
			}
			return $dt;
		} else {
			return NULL;
		}
    }
	
	function get_server_utils_count($box_id, $report_id) {
		$qs = 'SELECT * FROM utilsdb.hosts_utils where box_id = ? and report_id = ?';
		$query = $this->db->query($qs, array($box_id, $report_id));
		if ($query->num_rows() > 0) {
			return $query->num_rows();
		} else {
			return 0;
		}
	}
	
	function get_server_utils($box_id, $report_id) {
		$qs = 'SELECT * FROM utilsdb.hosts_utils where box_id = ? and report_id = ?';
		$query = $this->db->query($qs, array($box_id, $report_id));
		if ($query->num_rows() > 0) {
			$dt = array();
			foreach ($query->result() as $itm) {
				$i['report_id'] = $itm->report_id;
				$i['box_id'] = $itm->box_id;
				$i['server_id'] = $itm->server_id;
				$i['hostname'] = $itm->hostname;
				$i['hostalias'] = $itm->hostalias;
				$i['total_vcpu'] = $itm->total_vcpu;
				$i['used_vcpu'] = $itm->used_vcpu;
				$i['used_vcpu_pct'] = round(($itm->used_vcpu/$itm->total_vcpu)*100);
				$i['free_vcpu'] = $itm->total_vcpu - $itm->used_vcpu;
				$i['free_vcpu_pct'] = round((($itm->total_vcpu - $itm->used_vcpu)/$itm->total_vcpu)*100);
				$i['total_mem'] = $itm->total_mem;
				$i['used_mem'] = $itm->used_mem;
				$i['used_mem_pct'] = round(($itm->used_mem/$itm->total_mem)*100);
				$i['free_mem'] = $itm->total_mem - $itm->used_mem;
				$i['free_mem_pct'] = round((($itm->total_mem - $itm->used_mem)/$itm->total_mem)*100);
				array_push($dt, $i);
			}
			return $dt;
		} else {
			return NULL;
		}
	}
	
	function get_box_data_count($box_id, $report_id) {
		$qs = 'select count(utils_data.id) as row_cnt from utils_data join exalogic_servers on utils_data.server_id = exalogic_servers.id where exalogic_servers.box_id = ? and report_id = ? order by utils_data.server_id';
		$query = $this->db->query($qs, array($box_id, $report_id));
		if ($query->num_rows() > 0) {
			return $query->row()->row_cnt;
		} else {
			return 0;
		}
	}
	
	function get_box_data($box_id, $report_id) {
		$qs = 'select utils_data.id, exalogic_servers.hostname, utils_data.vmname, utils_data.vcpu, utils_data.memory, utils_data.os, utils_data.osstor, utils_data.attachedstor, utils_data.ipaddress, utils_data.hostname as vmhostname, utils_data.state from utilsdb.utils_data join exalogic_servers on utils_data.server_id = exalogic_servers.id where exalogic_servers.box_id = ? and report_id = ? order by utils_data.server_id';
		$query = $this->db->query($qs, array($box_id, $report_id));
		if ($query->num_rows() > 0) {
			$dt = array();
			foreach ($query->result() as $itm) {
				$i['id'] = $itm->id;
				$i['hostname'] = $itm->hostname;
				$i['vmname'] = $itm->vmname;
				$i['vcpu'] = $itm->vcpu;
				$i['memory'] = $itm->memory;
				$i['os'] = $itm->os;
				$i['osstor'] = $itm->osstor;
				$i['attachedstor'] = $itm->attachedstor;
				$i['ipaddress'] = $itm->ipaddress;
				$i['vmhostname'] = $itm->vmhostname;
				$i['state'] = $itm->state;
				array_push($dt, $i);
			}
			return $dt;
		} else {
			return NULL;
		}
	}
	
	function get_box_detail_count($box_id, $report_id) {
		$qs = 'SELECT distinct(exalogic_boxes.id) as row_cnt FROM utilsdb.hosts_utils JOIN exalogic_boxes ON hosts_utils.box_id = exalogic_boxes.id WHERE hosts_utils.report_id = ? and hosts_utils.box_id = ? GROUP BY hosts_utils.box_id, hosts_utils.report_id';
		$query = $this->db->query($qs, array($report_id, $box_id));
		if ($query->num_rows() > 0) {
			return $query->num_rows();
		} else {
			return 0;
		}
	}
	
    function get_box_detail($box_id, $report_id) {
		$qs = 'SELECT box_utils.*,  zfssa_data.total_size as total_zfssa, zfssa_data.used_size as used_zfssa, zfssa_data.free_size as free_zfssa FROM  box_utils JOIN zfssa_data ON box_utils.box_id = zfssa_data.box_id AND box_utils.report_id = zfssa_data.report_id where box_utils.report_id = ? and box_utils.box_id = ?';
		$query = $this->db->query($qs, array($report_id, $box_id));
		if ($query->num_rows() > 0) {
			$dt = array();
			foreach ($query->result() as $itm) {
				$i['report_id'] = $itm->report_id;
				$i['box_id'] = $itm->box_id;
				$i['box_name'] = $itm->box_name;
				$i['box_alias'] = $itm->box_alias;
				$i['total_vcpu'] = $itm->total_box_vcpu;
				$i['used_vcpu'] = $itm->used_box_vcpu;
				$i['used_vcpu_pct'] = round(($itm->used_box_vcpu/$itm->total_box_vcpu) * 100);
				$i['free_vcpu'] = $itm->total_box_vcpu - $itm->used_box_vcpu;
				$i['free_vcpu_pct'] = round((($itm->total_box_vcpu - $itm->used_box_vcpu)/$itm->total_box_vcpu) * 100);
				$i['total_mem'] = $itm->total_box_mem;
				$i['used_mem'] = $itm->used_box_mem;
				$i['used_mem_pct'] = round(($itm->used_box_mem/$itm->total_box_mem) * 100);
				$i['free_mem'] = $itm->total_box_mem - $itm->used_box_mem;
				$i['free_mem_pct'] = round((($itm->total_box_mem - $itm->used_box_mem)/$itm->total_box_mem) * 100);
				$i['total_zfssa'] = $itm->total_zfssa;
				$i['used_zfssa'] = $itm->used_zfssa;
				$i['used_zfssa_pct'] = round(($itm->used_zfssa/$itm->total_zfssa) * 100);
				$i['free_zfssa'] = $itm->free_zfssa;
				$i['free_zfssa_pct'] = round(($itm->free_zfssa/$itm->total_zfssa) * 100);
				array_push($dt, $i);
			}
			return $dt;
		} else {
			return NULL;
		}
    }
	
	function get_exa_util_hist() {
		$qs = "SELECT box_utils.*, utils_report.report_alias, zfssa_data.used_size as used_zfssa, zfssa_data.free_size as free_zfssa FROM utilsdb.box_utils JOIN utils_report ON box_utils.report_id = utils_report.report_id JOIN zfssa_data ON box_utils.box_id = zfssa_data.box_id AND box_utils.report_id = zfssa_data.report_id ORDER BY box_utils.report_id, box_utils.box_id";
		$query = $this->db->query($qs);
		if ($query->num_rows() > 0) {
			$res = array();
			foreach ($query->result() as $itm) {
				$vcpu_key = $itm->box_alias . "_used_vcpu";
				$mem_key = $itm->box_alias . "_used_mem";
				$zfssa_key = $itm->box_alias . "_used_zfssa";
				$res[$itm->report_id]['report_id'] = $itm->report_id;
				$res[$itm->report_id]['report_alias'] = $itm->report_alias;
				$res[$itm->report_id] = array_merge($res[$itm->report_id], array($vcpu_key => $itm->used_box_vcpu, $mem_key => $itm->used_box_mem, $zfssa_key => $itm->used_zfssa));
			}
			
			$res2 = array();
			foreach ($res as $res_itm) {
				array_push($res2, $res_itm);
			}
			return $res2;
		} else {
			return NULL;
		}
	}
}