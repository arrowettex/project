<!-- main content -->
<div class="main" id="projectExplorer">
        <div class="header is-size-2 bold">Partner Users Accounts</div>

        <div class="columns">
            
                <div class="column is-10" id="clientList">
                    <div class="card bodymar">
                        <div class="header is-size-4 bold">Partner Users</div>
						<!-- PUT A SORT DROPDOWN SORT BY STATUS -->
						
                    <table class="table is-fullwidth is-hoverable is-scrollable">
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Email</th>
								<th>Documents</th>
								<th>Applied On</th>
								<th>STATUS</th>
								<th></th>
                            </tr>
                        </thead>
                        <tbody height="200px">
                            <?php
                                if(count($partners) > 0){
                                    foreach ($partners as $index => $partner) {
                            ?>
                                <tr>
									<td><?php echo ucwords($partner['companyName']); ?></td>
                                    <td><?php echo strtolower($partner['email']); ?></td>
									<td>OPEN SUBMITTED DOCUMENTS</td>
									<td><?php echo date("M d, Y h:i:a", $partner['createdAt']['seconds']); ?></td>
									<td><?php echo ($partner['approved'] == 0) ? 'Pending': ($partner['approved'] == 1 ? 'Approved': 'Rejected'); ?></td>
									<td>
                                        <?php if ($partner['approved'] == 0){ ?>
                                            <button onclick="changePartnerStatus('<?php echo $index; ?>','approve')" style="background-color: green; color: #fff;">Approve</button> / <button onclick="changePartnerStatus('<?php echo $index; ?>','reject')" style="background-color: red; color: #fff;">Reject</button>
                                        <?php } ?>
                                    </td>
                                </tr>
                            <?php } } else { echo "<tr><td colspan='6' style='text-align:center;'>No Data Found!</td></tr>"; } ?>
                        </tbody>
                    </table><!-- end of table -->
                        
                </div> <!-- end of card -->
            </div><!-- end of client list -->
            
        </div><!-- end of columns container -->        
    </div>
    <!-- end of main content -->
<script>
    function changePartnerStatus(partner_id, update_status_to) {
        if (confirm('Are you sure to '+ update_status_to + ' this partner')){
            $.ajax({
                type: "POST",
                url: '<?php echo base_url().'partner_user/change_partner_user_status'; ?>',
                data: {partner_id: partner_id, update_status_to: update_status_to},
                dataType: "json",
                success: function(data)
                {
                    if (data.status == 'success'){
                        alert('Status changed successfully.');
                        window.location = '<?php echo base_url().'partner_user'; ?>';
                    }else{                        
                        alert('Oops ... Some error occured!');
                    }
                }
            });
        }
    }
</script>