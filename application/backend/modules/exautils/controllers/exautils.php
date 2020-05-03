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
		$this->load->model('Report_model');
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
		$report_name = $this->input->get('query', TRUE) > '' ? $this->input->get('query', TRUE) : '';
		$count = ($report_name != '') ? $this->Report_model->count_entry("report_name like '%".$report_name."%'") : $this->Report_model->count_entry();
	    $entries = ($report_name != '') ? $this->Report_model->get_entry("report_name like '%".$report_name."%'") : $this->Report_model->get_entry(); 
		
	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_exa_utils_hist() {
		$res = $this->Exautils_model->get_exa_util_hist();
		$count = isset($res) ? count($res) : 0;
	    $entries = $res;
	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;
		extjs_output($data);
	   
	}
	
	public function get_utils($env) {
	    
	    $report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		
		$count = $this->Exautils_model->get_box_utils_count($report_id, $env);
	    $entries = $this->Exautils_model->get_box_utils($report_id, $env);

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_box_util($box_id) {
	    $report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		$count = $this->Exautils_model->get_server_utils_count($box_id, $report_id);
	    $entries = $this->Exautils_model->get_server_utils($box_id, $report_id);

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_box_data($box_id) {
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		$count = $this->Exautils_model->get_box_data_count($box_id, $report_id);
	    $entries = $this->Exautils_model->get_box_data($box_id, $report_id);

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function get_box_detail($box_id) {
		$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : 3;
		$count = $this->Exautils_model->get_box_detail_count($box_id, $report_id);
	    $entries = $this->Exautils_model->get_box_detail($box_id, $report_id);

	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
}