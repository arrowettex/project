
    <!-- sidenav -->
    <div class="sidenav">
        <!-- user area -->
        <section class="userarea">
            <div class="img">
                <!-- <img src="" alt="User Img"> -->
            </div>

            <div class="details">
                <div id="username"><?php echo $this->session->name; ?></div>
                <div id="userpos">Position</div>
            </div>
        </section><!-- end of user area -->

        <br>

        <a href="<?php echo base_url(); ?>dashboard" class="categ1 <?php echo ($this->router->fetch_class() == "dashboard")? "active":""; ?>">Dashboard</a>
		<a href="<?php echo base_url(); ?>client_user" class="categ1 <?php echo ($this->router->fetch_class() == "client_user")? "active":""; ?>">Client Accounts</a>
		<a href="<?php echo base_url(); ?>partner_user" class="categ1 <?php echo ($this->router->fetch_class() == "partner_user")? "active":""; ?>">Partner Accounts</a>
        <a href="Add Projects.html" class="categ1">Add Projects</a>
        <a href="#" class="categ1">Edit Projects</a>
        <a href="#" class="categ1">Calendar</a>
        <a href="#" class="categ1">Forms</a>

    </div>
