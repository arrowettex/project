<?php

defined('BASEPATH') OR exit('No direct script access allowed');

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

class Client_user extends CI_Controller {

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
    $data['clients'] = array();

    if ($this->database->getReference('users')->orderByKey()->getSnapshot()->hasChildren()){
      $data['clients'] = $this->database->getReference('users')->orderByKey('name')->getSnapshot()->getValue();
    }
    
    $this->load->view($this->headerPage);
    $this->load->view($this->sidemenu);
    $this->load->view('client_user', $data);
    $this->load->view($this->footerPage);
  }

}
