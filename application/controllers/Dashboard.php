<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

  public $headerPage = 'header';
  public $sidemenu = 'sidebar';
  public $footerPage = 'footer';

  public function __construct() {
    parent::__construct();

    if (empty($this->session->userdata('login_id')))
      redirect(base_url());
  }

  public function index() {
	
    $this->load->view($this->headerPage);
    $this->load->view($this->sidemenu);
    $this->load->view('dashboard');
    $this->load->view($this->footerPage);
  }

  public function edit_profile() {
    $admin_user_id = $this->session->admin_id;

    $data['admin_user_details'] = $this->my_model->get_user_data($admin_user_id);

    $this->load->view($this->headerPage);
    $this->load->view($this->sidemenu);
    $this->load->view('edit_profile', $data);
    $this->load->view($this->footerPage);
  }

  public function edit_profile_submit() {
    $admin_user_id = $this->session->admin_id;

    $post_data = $this->input->post(NULL, TRUE);

    foreach($post_data as $key => $value){
      $$key = is_array($value) ? $value:trim($value);
      $update_admin_user_data[$key] = trim($value);
    }

    $update_admin_user_data['updated_date'] = date('Y-m-d H:i:s');

    $affected_rows = $this->my_model->update_user_profile($admin_user_id, $update_admin_user_data);

    if ($affected_rows == 1) {
      $this->session->set_flashdata('msg_success', 'Profile Updated Sucessfully.');

      $_SESSION['admin_name'] = $name;
      $_SESSION['admin_email'] = $email;
      $_SESSION['admin_mobile'] = $mobile;

    } else {
      $this->session->set_flashdata('msg_error', 'Profile Updated Error.');
    }
    redirect('dashboard/edit_profile');
  }

  public function change_password() {
    $this->load->view($this->headerPage);
    $this->load->view($this->sidemenu);
    $this->load->view('change_password');
    $this->load->view($this->footerPage);
  }

  public function change_password_submit() {

    $admin_user_id = $this->session->admin_id;

    if (isset($_POST['change_password'])) {
      $current_password = $this->input->post('current_password');
      $new_password = $this->input->post('new_password');
      $confirm_new_password = $this->input->post('confirm_new_password');

      if ($current_password == $new_password){
        $this->session->set_flashdata('msg_error', 'Current password & new password can not be same!');
      }else{

        $admin_user_result = $this->my_model->get_user_data_by_password_and_id($admin_user_id,$this->reusable->password_encryption($current_password));

        if (!empty($admin_user_result['id'])) {
          if ($new_password == $confirm_new_password) {
            $user_data = array(
              'password' => $this->reusable->password_encryption($new_password),
              'updated_date' => date('Y-m-d H:i:s')
            );

            $affected_rows = $this->my_model->update_user_profile($admin_user_id, $user_data);
            if ($affected_rows == 1)
            $this->session->set_flashdata('msg_success', 'Password Changed Successfully.');
            else
            $this->session->set_flashdata('msg_error', 'Some error occured. Please try again.');
          } else {
            $this->session->set_flashdata('msg_error', 'New password & confirm password did not matched!');
          }
        } else {
          $this->session->set_flashdata('msg_error', 'Enter correct current password!');
        }
      }
      redirect('dashboard/change_password');
    } else {
      redirect('dashboard/change_password');
    }
  }

}
