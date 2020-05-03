<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Report_model extends CI_Model {

	private $table;
	private $table_fields;
	private $table_fields_join;

    function __construct() {
        parent::__construct();

		$this->table = 'utils_report';

		$this->table_fields = array(
			$this->table.'.report_id',
			$this->table.'.report_name',
			$this->table.'.report_alias',
			$this->table.'.date_created',
			$this->table.'.last_update'
		);

		$this->table_fields_join = array();
    }

    function get_all_entries($filter = array(), $limit = '45', $offset = '0', $order = '') {
		$this->db->select(implode(', ', array_merge($this->table_fields, $this->table_fields_join)));
		$this->db->from($this->table);

		if (is_array($filter) && count($filter) > 0) generate_filter($filter);

		if ($order > '') {
		    $this->db->order_by($order);
		}

		$this->db->limit($limit, $offset);

		$news_db_query = $this->db->get();

		if ($news_db_query->num_rows > 0) {
		    return $news_db_query->result();
		} else {
		    return false;
		}
    }

	function count_all_entries($filter = array()) {
        $this->db->from($this->table);

		if (is_array($filter) && count($filter) > 0) generate_filter($filter);

        return $this->db->count_all_results();
    }
	
    function get_entry($filter = array()) {
		$this->db->select(implode(', ', array_merge($this->table_fields, $this->table_fields_join)));
		$this->db->from($this->table);

		$this->db->where($filter);

		$query = $this->db->get();

		if ($query->num_rows > 0) {
		    return $query->result();
		} else {
		    return false;
		}
    }
	
	function count_entry($filter = array()) {
        $this->db->from($this->table);
		$this->db->where($filter);
        return $this->db->count_all_results();
	}

    function insert_entry($data) {
        $this->db->insert($this->table, $data);
        if($this->db->affected_rows() == 1) {
            return $this->db->insert_id();
        } else {
            return false;
        }
    }

    function update_entry($filter = array(), $data) {
		$this->db->where($filter);
        $this->db->update($this->table, $data);

        if($this->db->affected_rows() == 1) {
            return true;
        } else {
            return false;
        }
    }

    function delete_entry($filter = array()) {
        $this->db->where($filter);
        $this->db->delete($this->table);

        if($this->db->affected_rows() > 0) {
            return true;
        } else {
            return false;
        }
    }
	
	function get_id_by_alias($alias) {
		$qs = $this->get_entry(array('report_alias' => $alias));
		if ($qs) {
			$rep_id = '';
			foreach ($qs as $qsitm) {
				$rep_id = array('report_id' => $qsitm->report_id);
			}
			return $rep_id;
		} else {
			return false;
		}
	}
}