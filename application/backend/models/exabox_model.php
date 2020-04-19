<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Exabox_model extends CI_Model {

	private $table;
	private $table_fields;
	private $table_fields_join;

    function __construct() {
        parent::__construct();

		$this->table = 'exalogic_boxes';

		$this->table_fields = array(
			$this->table.'.id',
			$this->table.'.box_name',
			$this->table.'.box_site',
			$this->table.'.box_env',
			$this->table.'.box_alias',
			$this->table.'.box_ip',
			$this->table.'.iaas_user',
			$this->table.'.iaas_pass',
			$this->table.'.ovmm_user',
			$this->table.'.ovmm_pass',
			$this->table.'.zfssa1_ip',
			$this->table.'.zfssa2_ip',
			$this->table.'.zfssa_user',
			$this->table.'.zfssa_pass'
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

    function insert_entry($data) {
        $this->db->insert($this->table, $data);

        if($this->db->affected_rows() == 1) {
            return $this->db->insert_id();
        } else {
            return false;
        }
    }

    function update_entry($filter = array(), $data) {
        //if (is_array($filter) && count($filter) > 0) generate_filter($filter);
		$this->db->where($filter);
        $this->db->update($this->table, $data);

        if($this->db->affected_rows() == 1) {
            return true;
        } else {
            return false;
        }
    }

    function delete_entry($filter = array()) {
        //if (is_array($filter) && count($filter) > 0) generate_filter($filter);
		$this->db->where($filter);
        $this->db->delete($this->table);

        if($this->db->affected_rows() > 0) {
            return true;
        } else {
            return false;
        }
    }
}