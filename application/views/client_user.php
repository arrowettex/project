<!-- main content -->
    <div class="main" id="projectExplorer">
        <div class="header is-size-2 bold">Client Users Accounts</div>

        <div class="columns">
            
                <div class="column is-9" id="clientList">
                    <div class="card bodymar">
                        <div class="header is-size-4 bold">Client Users</div>
                            
                        <!-- start of table -->
                    <table class="table is-fullwidth is-hoverable is-scrollable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody height="200px">
                            <?php
                                if(count($clients) > 0){
                                    foreach ($clients as $index => $client) {
                            ?>
                                <tr>
                                    <td><?php echo ucwords($client['name']); ?></td>
                                    <td><?php echo $client['phone']; ?></td>
                                    <td><?php echo strtolower($client['email']); ?></td>
                                </tr>
                            <?php } } else { echo "<tr><td colspan='3' style='text-align:center;'>No Data Found!</td></tr>"; } ?>
                        </tbody>
                    </table><!-- end of table -->
                        
                </div> <!-- end of card -->
            </div><!-- end of client list -->
            
        </div><!-- end of columns container -->        
    </div>
    <!-- end of main content -->
