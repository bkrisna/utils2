<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

include APPPATH.'third_party/PHPExcel/PHPExcel.php';	

class ExportToExcel extends MY_Controller {
	
	private $excel;
	private $style_col;
	private $style_row;
	private $style_row_center;

	function __construct() {
        parent::__construct();
        $this->load->model('Exabox_model');
		$this->load->model('Exautils_model');
		$this->load->model('Report_model');
		
		// Buat sebuah variabel untuk menampung pengaturan style dari header tabel
	    $this->style_col = array(
			'font' => array('bold' => true), // Set font nya jadi bold
	      	'alignment' => array(
	        	'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER, // Set text jadi ditengah secara horizontal (center)
	        	'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER // Set text jadi di tengah secara vertical (middle)
	      	),
	      	'borders' => array(
	        	'top' => array('style'  => PHPExcel_Style_Border::BORDER_THIN), // Set border top dengan garis tipis
	        	'right' => array('style'  => PHPExcel_Style_Border::BORDER_THIN),  // Set border right dengan garis tipis
	        	'bottom' => array('style'  => PHPExcel_Style_Border::BORDER_THIN), // Set border bottom dengan garis tipis
	        	'left' => array('style'  => PHPExcel_Style_Border::BORDER_THIN) // Set border left dengan garis tipis
	      	)
	    );
		
	    $this->style_row = array(
	    	'alignment' => array(
	        	'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER // Set text jadi di tengah secara vertical (middle)
			),
	      	'borders' => array(
	        	'top' => array('style'  => PHPExcel_Style_Border::BORDER_THIN), // Set border top dengan garis tipis
	        	'right' => array('style'  => PHPExcel_Style_Border::BORDER_THIN),  // Set border right dengan garis tipis
	        	'bottom' => array('style'  => PHPExcel_Style_Border::BORDER_THIN), // Set border bottom dengan garis tipis
	        	'left' => array('style'  => PHPExcel_Style_Border::BORDER_THIN) // Set border left dengan garis tipis
	      	)
	    );
		
	    $this->style_row_center = array(
	    	'alignment' => array(
				'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
	        	'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER // Set text jadi di tengah secara vertical (middle)
	      	),
	      	'borders' => array(
	        	'top' => array('style'  => PHPExcel_Style_Border::BORDER_THIN), // Set border top dengan garis tipis
	        	'right' => array('style'  => PHPExcel_Style_Border::BORDER_THIN),  // Set border right dengan garis tipis
	        	'bottom' => array('style'  => PHPExcel_Style_Border::BORDER_THIN), // Set border bottom dengan garis tipis
	        	'left' => array('style'  => PHPExcel_Style_Border::BORDER_THIN) // Set border left dengan garis tipis
	      	)
	    );
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
	
	public function export() {
		
		$this->excel = new PHPExcel();
		
		if ($this->input->post('report_id', TRUE) > '') {
			$report_id = $this->input->post('report_id', TRUE) > '' ? $this->input->post('report_id', TRUE) : '';
			$is_exist = $this->Report_model->get_entry(array('report_id' => $report_id));
			
			if ($is_exist) {
			    $this->excel->getProperties()->setCreator('Exalogic Utils Report Generator')
			                 ->setLastModifiedBy('Exalogic Utils Report Generator')
			                 ->setTitle($report_title)
			                 ->setSubject($report_title)
			                 ->setDescription($report_title)
			                 ->setKeywords("Exalogic Utils Report");
				
				$activeSheetCount = 0;
				$box_data = $this->Exabox_model->get_entry();
				foreach ($box_data as $box) {
					$box_name = $box->box_name;
					$report_title = "Utils Report for ".$box_name;
					
					$this->excel->createSheet();
				    $this->excel->setActiveSheetIndex($activeSheetCount)->setCellValue('A1', $report_title); // Set kolom A1 dengan tulisan "DATA SISWA"
				    $this->excel->getActiveSheet()->mergeCells('A1:J1'); // Set Merge Cell pada kolom A1 sampai E1
				    $this->excel->getActiveSheet()->getStyle('A1')->getFont()->setBold(TRUE); // Set bold kolom A1
				    $this->excel->getActiveSheet()->getStyle('A1')->getFont()->setSize(15); // Set font size 15 untuk kolom A1
				    $this->excel->getActiveSheet()->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER); // Set text center untuk kolom A1
					
					// Buat header tabel nya pada baris ke 3
				    $this->excel->getActiveSheet()->setCellValue('A3', "No");
				    $this->excel->getActiveSheet()->setCellValue('B3', "Compute Node");
				    $this->excel->getActiveSheet()->setCellValue('C3', "VM Name");
				    $this->excel->getActiveSheet()->setCellValue('D3', "vCPU");
				    $this->excel->getActiveSheet()->setCellValue('E3', "Mem (M)");
					$this->excel->getActiveSheet()->setCellValue('F3', "OS");
					$this->excel->getActiveSheet()->setCellValue('G3', "OS Storage");
					$this->excel->getActiveSheet()->setCellValue('H3', "Attached Storage");
					$this->excel->getActiveSheet()->setCellValue('I3', "IP Address");
					$this->excel->getActiveSheet()->setCellValue('J3', "VM Hostname");
					
				    // Apply style header yang telah kita buat tadi ke masing-masing kolom header
				    $this->excel->getActiveSheet()->getStyle('A3')->applyFromArray($this->style_col);
				    $this->excel->getActiveSheet()->getStyle('B3')->applyFromArray($this->style_col);
				    $this->excel->getActiveSheet()->getStyle('C3')->applyFromArray($this->style_col);
				    $this->excel->getActiveSheet()->getStyle('D3')->applyFromArray($this->style_col);
				    $this->excel->getActiveSheet()->getStyle('E3')->applyFromArray($this->style_col);
					$this->excel->getActiveSheet()->getStyle('F3')->applyFromArray($this->style_col);
					$this->excel->getActiveSheet()->getStyle('G3')->applyFromArray($this->style_col);
					$this->excel->getActiveSheet()->getStyle('H3')->applyFromArray($this->style_col);
					$this->excel->getActiveSheet()->getStyle('I3')->applyFromArray($this->style_col);
					$this->excel->getActiveSheet()->getStyle('J3')->applyFromArray($this->style_col);
					
				    $vms = $this->Exautils_model->get_box_data($box->id, $report_id);
				    $no = 1; // Untuk penomoran tabel, di awal set dengan 1
				    $numrow = 4; // Set baris pertama untuk isi tabel adalah baris ke 4
				    foreach($vms as $vm) {
						$this->excel->getActiveSheet()->setCellValue('A'.$numrow, $no);
				      	$this->excel->getActiveSheet()->setCellValue('B'.$numrow, $vm['hostname']);
				      	$this->excel->getActiveSheet()->setCellValue('C'.$numrow, $vm['vmname']);
				      	$this->excel->getActiveSheet()->setCellValue('D'.$numrow, $vm['vcpu']);
				      	$this->excel->getActiveSheet()->setCellValue('E'.$numrow, $vm['memory']);
					  	$this->excel->getActiveSheet()->setCellValue('F'.$numrow, $vm['os']);
					  	$this->excel->getActiveSheet()->setCellValue('G'.$numrow, $vm['osstor']);
					  	$this->excel->getActiveSheet()->setCellValue('H'.$numrow, $vm['attachedstor']);
					  	$this->excel->getActiveSheet()->setCellValue('I'.$numrow, $vm['ipaddress']);
					  	$this->excel->getActiveSheet()->setCellValue('J'.$numrow, $vm['vmhostname']);
						
		  			    // Apply style row yang telah kita buat tadi ke masing-masing baris (isi tabel)
		  			    $this->excel->getActiveSheet()->getStyle('A'.$numrow)->applyFromArray($this->style_row_center);
		  			    $this->excel->getActiveSheet()->getStyle('B'.$numrow)->applyFromArray($this->style_row);
		  			    $this->excel->getActiveSheet()->getStyle('C'.$numrow)->applyFromArray($this->style_row);
		  			    $this->excel->getActiveSheet()->getStyle('D'.$numrow)->applyFromArray($this->style_row_center);
		  			    $this->excel->getActiveSheet()->getStyle('E'.$numrow)->applyFromArray($this->style_row_center);
		  				$this->excel->getActiveSheet()->getStyle('F'.$numrow)->applyFromArray($this->style_row);
		  				$this->excel->getActiveSheet()->getStyle('G'.$numrow)->applyFromArray($this->style_row_center);
		  				$this->excel->getActiveSheet()->getStyle('H'.$numrow)->applyFromArray($this->style_row_center);
		  				$this->excel->getActiveSheet()->getStyle('I'.$numrow)->applyFromArray($this->style_row_center);
		  				$this->excel->getActiveSheet()->getStyle('J'.$numrow)->applyFromArray($this->style_row);
		  			    $no++; // Tambah 1 setiap kali looping
		  			    $numrow++; // Tambah 1 setiap kali looping
					}
				    // Set width kolom
				    $this->excel->getActiveSheet()->getColumnDimension('A')->setWidth(5); // Set width kolom A
				    $this->excel->getActiveSheet()->getColumnDimension('B')->setWidth(30); // Set width kolom B
				    $this->excel->getActiveSheet()->getColumnDimension('C')->setWidth(25); // Set width kolom C
				    $this->excel->getActiveSheet()->getColumnDimension('D')->setWidth(10); // Set width kolom D
				    $this->excel->getActiveSheet()->getColumnDimension('E')->setWidth(10); // Set width kolom E
					$this->excel->getActiveSheet()->getColumnDimension('F')->setWidth(20); // Set width kolom E
					$this->excel->getActiveSheet()->getColumnDimension('G')->setWidth(15); // Set width kolom E
					$this->excel->getActiveSheet()->getColumnDimension('H')->setWidth(15); // Set width kolom E
					$this->excel->getActiveSheet()->getColumnDimension('I')->setWidth(30); // Set width kolom E
					$this->excel->getActiveSheet()->getColumnDimension('J')->setWidth(40); // Set width kolom E
					
				    // Set height semua kolom menjadi auto (mengikuti height isi dari kolommnya, jadi otomatis)
				    $this->excel->getActiveSheet()->getDefaultRowDimension()->setRowHeight(-1);
				    // Set orientasi kertas jadi LANDSCAPE
				    $this->excel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
				    // Set judul file excel nya
				    $this->excel->getActiveSheet()->setTitle($box_name);
					$activeSheetCount++;
				}
				
			    $this->excel->setActiveSheetIndex(0);
			    // Proses file excel
			    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			    header('Content-Disposition: attachment; filename="Exalogic Utils Report.xlsx"'); // Set nama file excel nya
			    header('Cache-Control: max-age=0');
				header('Cache-Control: max-age=1');
				header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
				header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
				header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
				header ('Pragma: public'); // HTTP/1.0
			    $write = PHPExcel_IOFactory::createWriter($this->excel, 'Excel2007');
			    $write->save('php://output');
			} else {
		        $data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Unable to export report. Data not found. Please try again.';
				extjs_output($data);
			}
		} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Unable to export report. Invalid parameter. Please try again.';
			extjs_output($data);
		}
	}
	
	public function export2() {
		
		if (($this->input->get('report_id', TRUE) > '') && ($this->input->get('box_id', TRUE) > '')) {
			$report_id = $this->input->get('report_id', TRUE) > '' ? $this->input->get('report_id', TRUE) : '';
			$box_id = $this->input->get('box_id', TRUE) > '' ? $this->input->get('box_id', TRUE) : '';
			
			
			$box_data = $this->Exabox_model->get_entry(array('id' => $box_id));
			$box_name = $box_data[0]->box_name;
			
			$is_exist = $this->Report_model->get_entry(array('report_id' => $report_id));
			if ($is_exist) {
			
				$report_title = "Utils Report for ".$box_name;
			
			
				include APPPATH.'third_party/PHPExcel/PHPExcel.php';
		
				$excel = new PHPExcel();
			    // Settingan awal fil excel
			    $excel->getProperties()->setCreator('Exalogic Utils Report Generator')
			                 ->setLastModifiedBy('Exalogic Utils Report Generator')
			                 ->setTitle($report_title)
			                 ->setSubject($report_title)
			                 ->setDescription($report_title)
			                 ->setKeywords("Exalogic Utils Report");
		
			    // Buat sebuah variabel untuk menampung pengaturan style dari header tabel
			    $style_col = array(
					'font' => array('bold' => true), // Set font nya jadi bold
			      	'alignment' => array(
			        	'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER, // Set text jadi ditengah secara horizontal (center)
			        	'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER // Set text jadi di tengah secara vertical (middle)
			      	),
			      	'borders' => array(
			        	'top' => array('style'  => PHPExcel_Style_Border::BORDER_THIN), // Set border top dengan garis tipis
			        	'right' => array('style'  => PHPExcel_Style_Border::BORDER_THIN),  // Set border right dengan garis tipis
			        	'bottom' => array('style'  => PHPExcel_Style_Border::BORDER_THIN), // Set border bottom dengan garis tipis
			        	'left' => array('style'  => PHPExcel_Style_Border::BORDER_THIN) // Set border left dengan garis tipis
			      	)
			    );
		
			    // Buat sebuah variabel untuk menampung pengaturan style dari isi tabel
			    $style_row = array(
			    	'alignment' => array(
			        	'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER // Set text jadi di tengah secara vertical (middle)
					),
			      	'borders' => array(
			        	'top' => array('style'  => PHPExcel_Style_Border::BORDER_THIN), // Set border top dengan garis tipis
			        	'right' => array('style'  => PHPExcel_Style_Border::BORDER_THIN),  // Set border right dengan garis tipis
			        	'bottom' => array('style'  => PHPExcel_Style_Border::BORDER_THIN), // Set border bottom dengan garis tipis
			        	'left' => array('style'  => PHPExcel_Style_Border::BORDER_THIN) // Set border left dengan garis tipis
			      	)
			    );
				
			    $style_row_center = array(
			    	'alignment' => array(
						'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
			        	'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER // Set text jadi di tengah secara vertical (middle)
			      	),
			      	'borders' => array(
			        	'top' => array('style'  => PHPExcel_Style_Border::BORDER_THIN), // Set border top dengan garis tipis
			        	'right' => array('style'  => PHPExcel_Style_Border::BORDER_THIN),  // Set border right dengan garis tipis
			        	'bottom' => array('style'  => PHPExcel_Style_Border::BORDER_THIN), // Set border bottom dengan garis tipis
			        	'left' => array('style'  => PHPExcel_Style_Border::BORDER_THIN) // Set border left dengan garis tipis
			      	)
			    );
		
			    $excel->setActiveSheetIndex(0)->setCellValue('A1', $report_title); // Set kolom A1 dengan tulisan "DATA SISWA"
			    $excel->getActiveSheet()->mergeCells('A1:J1'); // Set Merge Cell pada kolom A1 sampai E1
			    $excel->getActiveSheet()->getStyle('A1')->getFont()->setBold(TRUE); // Set bold kolom A1
			    $excel->getActiveSheet()->getStyle('A1')->getFont()->setSize(15); // Set font size 15 untuk kolom A1
			    $excel->getActiveSheet()->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER); // Set text center untuk kolom A1
			
			    // Buat header tabel nya pada baris ke 3
			    $excel->setActiveSheetIndex(0)->setCellValue('A3', "No");
			    $excel->setActiveSheetIndex(0)->setCellValue('B3', "Compute Node");
			    $excel->setActiveSheetIndex(0)->setCellValue('C3', "VM Name");
			    $excel->setActiveSheetIndex(0)->setCellValue('D3', "vCPU");
			    $excel->setActiveSheetIndex(0)->setCellValue('E3', "Mem (M)");
				$excel->setActiveSheetIndex(0)->setCellValue('F3', "OS");
				$excel->setActiveSheetIndex(0)->setCellValue('G3', "OS Storage");
				$excel->setActiveSheetIndex(0)->setCellValue('H3', "Attached Storage");
				$excel->setActiveSheetIndex(0)->setCellValue('I3', "IP Address");
				$excel->setActiveSheetIndex(0)->setCellValue('J3', "VM Hostname");
			
			    // Apply style header yang telah kita buat tadi ke masing-masing kolom header
			    $excel->getActiveSheet()->getStyle('A3')->applyFromArray($style_col);
			    $excel->getActiveSheet()->getStyle('B3')->applyFromArray($style_col);
			    $excel->getActiveSheet()->getStyle('C3')->applyFromArray($style_col);
			    $excel->getActiveSheet()->getStyle('D3')->applyFromArray($style_col);
			    $excel->getActiveSheet()->getStyle('E3')->applyFromArray($style_col);
				$excel->getActiveSheet()->getStyle('F3')->applyFromArray($style_col);
				$excel->getActiveSheet()->getStyle('G3')->applyFromArray($style_col);
				$excel->getActiveSheet()->getStyle('H3')->applyFromArray($style_col);
				$excel->getActiveSheet()->getStyle('I3')->applyFromArray($style_col);
				$excel->getActiveSheet()->getStyle('J3')->applyFromArray($style_col);
			
			    // Panggil function view yang ada di SiswaModel untuk menampilkan semua data siswanya
			    $vms = $this->Exautils_model->get_box_data($box_id, $report_id);
			    $no = 1; // Untuk penomoran tabel, di awal set dengan 1
			    $numrow = 4; // Set baris pertama untuk isi tabel adalah baris ke 4
			    foreach($vms as $vm) {
					//print_r($vm);
			      /*$excel->setActiveSheetIndex(0)->setCellValue('A'.$numrow, $no);
			      $excel->setActiveSheetIndex(0)->setCellValue('B'.$numrow, $vm['hostname']);
			      $excel->setActiveSheetIndex(0)->setCellValue('C'.$numrow, $vm['vmname']);
			      $excel->setActiveSheetIndex(0)->setCellValue('D'.$numrow, $vm['vcpu']);
			      $excel->setActiveSheetIndex(0)->setCellValue('E'.$numrow, $vm['memory']);
				  $excel->setActiveSheetIndex(0)->setCellValue('F'.$numrow, $vm['os']);
				  $excel->setActiveSheetIndex(0)->setCellValue('G'.$numrow, $vm['osstor']);
				  $excel->setActiveSheetIndex(0)->setCellValue('H'.$numrow, $vm['attachedstor']);
				  $excel->setActiveSheetIndex(0)->setCellValue('I'.$numrow, $vm['ipaddress']);
				  $excel->setActiveSheetIndex(0)->setCellValue('J'.$numrow, $vm['vmhostname']);
  
			      // Apply style row yang telah kita buat tadi ke masing-masing baris (isi tabel)
			      $excel->getActiveSheet()->getStyle('A'.$numrow)->applyFromArray($style_row_center);
			      $excel->getActiveSheet()->getStyle('B'.$numrow)->applyFromArray($style_row);
			      $excel->getActiveSheet()->getStyle('C'.$numrow)->applyFromArray($style_row);
			      $excel->getActiveSheet()->getStyle('D'.$numrow)->applyFromArray($style_row_center);
			      $excel->getActiveSheet()->getStyle('E'.$numrow)->applyFromArray($style_row_center);
				  $excel->getActiveSheet()->getStyle('F'.$numrow)->applyFromArray($style_row);
				  $excel->getActiveSheet()->getStyle('G'.$numrow)->applyFromArray($style_row_center);
				  $excel->getActiveSheet()->getStyle('H'.$numrow)->applyFromArray($style_row_center);
				  $excel->getActiveSheet()->getStyle('I'.$numrow)->applyFromArray($style_row_center);
				  $excel->getActiveSheet()->getStyle('J'.$numrow)->applyFromArray($style_row);
  
			      $no++; // Tambah 1 setiap kali looping
			      $numrow++; // Tambah 1 setiap kali looping*/
			    }
			    // Set width kolom
			    $excel->getActiveSheet()->getColumnDimension('A')->setWidth(5); // Set width kolom A
			    $excel->getActiveSheet()->getColumnDimension('B')->setWidth(30); // Set width kolom B
			    $excel->getActiveSheet()->getColumnDimension('C')->setWidth(25); // Set width kolom C
			    $excel->getActiveSheet()->getColumnDimension('D')->setWidth(10); // Set width kolom D
			    $excel->getActiveSheet()->getColumnDimension('E')->setWidth(10); // Set width kolom E
				$excel->getActiveSheet()->getColumnDimension('F')->setWidth(20); // Set width kolom E
				$excel->getActiveSheet()->getColumnDimension('G')->setWidth(15); // Set width kolom E
				$excel->getActiveSheet()->getColumnDimension('H')->setWidth(15); // Set width kolom E
				$excel->getActiveSheet()->getColumnDimension('I')->setWidth(30); // Set width kolom E
				$excel->getActiveSheet()->getColumnDimension('J')->setWidth(40); // Set width kolom E

			    // Set height semua kolom menjadi auto (mengikuti height isi dari kolommnya, jadi otomatis)
			    $excel->getActiveSheet()->getDefaultRowDimension()->setRowHeight(-1);
			    // Set orientasi kertas jadi LANDSCAPE
			    $excel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
			    // Set judul file excel nya
			    $excel->getActiveSheet(0)->setTitle($box_name);
				
				
			    $excel->setActiveSheetIndex(0);
			    // Proses file excel
			    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			    header('Content-Disposition: attachment; filename="'.$report_title.'.xlsx"'); // Set nama file excel nya
			    header('Cache-Control: max-age=0');
				header('Cache-Control: max-age=1');
				header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
				header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
				header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
				header ('Pragma: public'); // HTTP/1.0
			    $write = PHPExcel_IOFactory::createWriter($excel, 'Excel2007');
			    $write->save('php://output');
			} else {
		        $data['success'] = false;
		        $data['title'] = 'Error';
		        $data['message'] = 'Unable to export report. Data not found. Please try again.';
				extjs_output($data);
			}
		} else {
	        $data['success'] = false;
	        $data['title'] = 'Error';
	        $data['message'] = 'Unable to export report. Invalid parameter. Please try again.';
			extjs_output($data);
		}
	}
}