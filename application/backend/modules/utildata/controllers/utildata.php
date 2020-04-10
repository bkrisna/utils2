<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
class Utildata extends MY_Controller {

	function __construct() {
        parent::__construct();
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
	
	private function getMonthString($m) {
		switch ($m) {
			case '1':
				return "Jan";
				break;
			case '2':
				return "Feb";
				break;
			case '3':
				return "Mar";
				break;
			case '4':
				return "Apr";
				break;
			case '5':
				return "May";
				break;
			case '6':
				return "Jun";
				break;
			case '7':
				return "Jul";
				break;
			case '8':
				return "Aug";
				break;
			case '9':
				return "Sep";
				break;
			case '10':
				return "Oct";
				break;
			case '11':
				return "Nov";
				break;
			case '12':
				return "Dec";
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
		$entries = $this->Report_model->get_data_from_alias($report_alias);
		$count = isset($entries) ? count($entries) : 0;
	    $data['success'] = true;
	    $data['total'] = $count;
	    $data['items'] = $entries;

	    extjs_output($data);
	}
	
	public function getUtilData() {
		return null;
	}
}