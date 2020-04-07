<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
   * Movies
   *
   *
   * @package    CodeIgniter meets ExtJS
   * @subpackage Movies
   * @author     Richard Jäger <richiejaeger@gmail.com>
   */

class Exautils extends MY_Controller {

	function __construct() {
        parent::__construct();
        $this->load->model('Exautils_model');
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

	public function get_report_list() {
		$count = $this->Exautils_model->get_report_list_count();
	    $entries = $this->Exautils_model->get_report_list();

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_sdp_utils() {
	    
	    $report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		
		$count = $this->Exautils_model->get_box_utils_count($report_id, "SDP");
	    $entries = $this->Exautils_model->get_box_utils($report_id, "SDP");

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_sdp_utils_hist() {
		$res = $this->Exautils_model->get_vcpu_util_hist();
		$count = isset($res) ? count($res) : 0;
	    $entries = $res;
	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;
		extjs_output($data);
	   
	}
	
	public function get_crm_utils() {
	    
	    $report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		
		$count = $this->Exautils_model->get_box_utils_count($report_id, "CRM");
	    $entries = $this->Exautils_model->get_box_utils($report_id, "CRM");

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_crm_utils_hist() {
	    
	    $count = $this->Exautils_model->get_box_utils_hist_count("CRM");
	    $entries = $this->Exautils_model->get_box_utils_hist("CRM");

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_sdp_jtn_util() {
	    
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		
		$count = $this->Exautils_model->get_server_utils_count('2', $report_id);
	    $entries = $this->Exautils_model->get_server_utils('2', $report_id);

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_sdp_jtn_data() {
	    
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		
		$count = $this->Exautils_model->get_box_data_count('2', $report_id);
	    $entries = $this->Exautils_model->get_box_data('2', $report_id);

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_sdp_stl_util() {
	    
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		
		$count = $this->Exautils_model->get_server_utils_count('3', $report_id);
	    $entries = $this->Exautils_model->get_server_utils('3', $report_id);

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_sdp_stl_data() {
	    
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		
		$count = $this->Exautils_model->get_box_data_count('3', $report_id);
	    $entries = $this->Exautils_model->get_box_data('3', $report_id);

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_sdp_sby_util() {
	    
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		
		$count = $this->Exautils_model->get_server_utils_count('1', $report_id);
	    $entries = $this->Exautils_model->get_server_utils('1', $report_id);

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_sdp_sby_data() {
	    
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		
		$count = $this->Exautils_model->get_box_data_count('1', $report_id);
	    $entries = $this->Exautils_model->get_box_data('1', $report_id);

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_crm_jtn_util() {
	    
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		
		$count = $this->Exautils_model->get_server_utils_count('4', $report_id);
	    $entries = $this->Exautils_model->get_server_utils('4', $report_id);

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_crm_jtn_data() {
	    
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		
		$count = $this->Exautils_model->get_box_data_count('4', $report_id);
	    $entries = $this->Exautils_model->get_box_data('4', $report_id);

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_crm_stl_util() {
	    
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		
		$count = $this->Exautils_model->get_server_utils_count('5', $report_id);
	    $entries = $this->Exautils_model->get_server_utils('5', $report_id);

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_crm_stl_data() {
	    
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		
		$count = $this->Exautils_model->get_box_data_count('5', $report_id);
	    $entries = $this->Exautils_model->get_box_data('5', $report_id);

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
}