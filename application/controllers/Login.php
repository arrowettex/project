<?php

defined('BASEPATH') OR exit('No direct script access allowed');

use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;

class Login extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        
        if (!empty($this->session->userdata('login_id')))
            redirect('dashboard');
        
        $this->load->view('login');
    }

    public function login_process() {
		
        if (isset($_POST['login'])){

            $service_account = ServiceAccount::fromValue(AUTH_FILE);
            $firebase = (new Factory)
               ->withServiceAccount($service_account)
               ->withDatabaseUri('https://jobflex-56143.firebaseio.com');
            
            $database = $firebase->createDatabase();

            $adminId = 10101;
            $dbname = 'admin';
            
            if ($database->getReference($dbname)->getSnapshot()->hasChild($adminId)){
               $admin_data = $database->getReference($dbname)->getChild($adminId)->getValue();
               
               if ($_POST['email'] == $admin_data['email'] && $_POST['password'] == $admin_data['password']){                    
                    $newdata = array(
                    'name' => $admin_data['name'],
                    'email' => $admin_data['email'],
                    'login_id' => $adminId
                    );

                    $this->session->set_userdata($newdata);
                    redirect('dashboard');
               }else{
                    echo "<script>alert('Email & password did not matched!');window.location = '".base_url()."';</script>";
                    exit;
               }
            } else {
               echo "<script>alert('Oops ... some error occured');window.location = '".base_url()."';</script>";
               exit;
            }
        }
    }

    public function logout() {
        $user_data = $this->session->all_userdata();

        foreach ($user_data as $key => $value)
            $this->session->unset_userdata($key);
        
        redirect($this->login_redirect, 'refresh');
    }

}
