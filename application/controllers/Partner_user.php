<?php

defined('BASEPATH') OR exit('No direct script access allowed');

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

class Partner_user extends CI_Controller {

  public $headerPage = 'header';
  public $sidemenu = 'sidebar';
  public $footerPage = 'footer';
  private $database = '';

  public function __construct() {
    parent::__construct();

    if (empty($this->session->userdata('login_id')))
      redirect(base_url());

    $service_account = ServiceAccount::fromValue(AUTH_FILE);
    $firebase = (new Factory)
       ->withServiceAccount($service_account)
       ->withDatabaseUri('https://jobflex-56143.firebaseio.com');
    
    $this->database = $firebase->createDatabase();
  }

  public function index() {
    $data['partner'] = array();

    if ($this->database->getReference('partners')->orderByKey()->getSnapshot()->hasChildren()){
      $data['partners'] = $this->database->getReference('partners')->orderByKey('name')->getSnapshot()->getValue();
    }
    
    $this->load->view($this->headerPage);
    $this->load->view($this->sidemenu);
    $this->load->view('partner_user', $data);
    $this->load->view($this->footerPage);
  }

  public function change_partner_user_status() {

    $partner_id = $this->input->post('partner_id');

    if ($this->database->getReference('partners')->getSnapshot()->hasChild($partner_id)){
      $partner_data = $this->database->getReference('partners')->getChild($partner_id)->getValue();

      $update_status_to = $this->input->post('update_status_to');

      $partner_data['approved'] = ($update_status_to == "approve") ? 1 : 2;


      $updates = [
        'partners/'.$partner_id => $partner_data
      ];

      $this->database->getReference() // this is the root reference
         ->update($updates);

      echo json_encode(array('status' => 'success'));
    }else{
      echo json_encode(array('status' => 'error'));
    }
  }

}
