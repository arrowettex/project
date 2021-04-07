<!DOCTYPE html>
<html lang="en" class="noscroll">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- CSS LINKS -->
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/main.css">
    <link rel="stylesheet" href="<?php echo base_url(); ?>assets/bulma/bulma.css">
    <title>CWMSI| Login</title>
</head>
<body class="bgtgrey">
    <section class="section fullheight">
        <div class="container fullheight">
            <div class="level columns fullheight">
                <div class="column"></div>
                <!-- main login form -->
                <div class="column">
                    <div class="card">
                        <div class="header ">
                            <p class="bold is-size-3 center">ADMIN</p>
                        </div>
                        <div class="card-content">
                            <form action="<?php echo base_url(); ?>login/login_process" method="post">
                                <input type="hidden" name="<?php echo $this->security->get_csrf_token_name(); ?>" value="<?php echo $this->security->get_csrf_hash(); ?>" />
                                <!-- username/email input -->
                                <div class="field">
                                    <label class="label"></label>
                                    <input class="input" type="email" required name="email" placeholder="Email">
                                    
                                </div>
                                <!-- password input -->
                                <div class="field">
                                    <input class="input" type="password" required name="password" placeholder="Password">    
                                </div>
                                <br>
                                
                                <!-- login button-->
                                <button class="widepad button is-primary is-fullwidth" type="submit" name="login">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div class="column"></div>
            </div>
        </div>
    </section>
</body>
</html>