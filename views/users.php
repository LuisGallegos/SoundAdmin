<div class="col-md-12">
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active" aria-hidden="true"><a href="#checkUsers" aria-controls="checkUsers" role="tab" data-toggle="tab">Edit Users&nbsp;&nbsp;
      <span class="fa-stack">
        <i class="fa fa-square-o fa-stack-2x"></i>
        <i class="fa fa fa-users fa-stack-1x"></i>
      </span>
    </a></li>
    <li role="presentation"><a href="#createUser" aria-controls="createUser" role="tab" data-toggle="tab">Create User&nbsp;&nbsp;
      <span class="fa-stack">
        <i class="fa fa-square-o fa-stack-2x"></i>
        <i class="fa fa-user-plus fa-stack-1x"></i>
      </span>
    </a></li>
  </ul>


<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Update User Info</h4>
      </div>
      <div class="modal-body">
        <form class="form-inline">
          <h3>Edit Username</h3>
          <div class="form-group">
            <label for="userName">Username:</label>
            <input type="text" class="form-control" id="userName" ng-model="updateUserName" ng-change="checkUsername()">
          </div>
          <button class="btn btn-success" ng-disabled="validUserName" ng-click="updateUser()">Save</button>
        </form>

        <form class="form-inline">
          <h3>Edit Password</h3>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" ng-model="updateUserPassword" ng-change="checkPass()">
          </div>
          <button class="btn btn-success" ng-disabled="validPassword" ng-click="updatePassword()">Save</button>
        </form>

        <form class="form-inline">
          <h3>Change Rol</h3>
          <div class="form-group">
            <select class="form-control" id="role" ng-model="updateUserRole" ng-change="checkRol()">
              <option value="">--- Select the Rol ---</option>
              <option ng-repeat = "role in roles" ng-value="role.id_Rol">{{role.name}}</option>
            </select>
          </div>
          <button class="btn btn-success" ng-disabled="validRol" ng-click="updateRole()">Save</button>
        </form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" ng-click="getUsers();getUsersActives();">Close</button>
      </div>
    </div>
  </div>
</div>


  <div class="tab-content">

    <div role="tabpanel" class="tab-pane active" id="checkUsers">
      <div class="col-md-12">
        <br><br><br>
          <table datatable="" dt-options="vm.dtOptions" dt-columns="vm.dtColumns" class="table table-striped table-bordered" dt-instance="vm.dtInstance"></table>
      </div>
    </div>

    <div role="tabpanel" class="tab-pane" id="createUser">
      <div class="col-md-12">
        <br><br><br>
        <form class="form-horizontal">
          <div class="form-group">
            <label class="control-label col-sm-2" for="user">Username:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="user" placeholder="Enter username" ng-model="newUser" required>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="userName">Name:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="userName" placeholder="Enter Name" ng-model="newUserName" required>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="userLastname">Lastname:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="userLastname" placeholder="Enter Lastname" ng-model="newUserLastName" required>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="pwd">Password:</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="pwd" placeholder="Enter password" ng-model="newUserPass" required>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="role">Role:</label>
            <div class="col-sm-10">
              <select class="form-control" id="role" ng-model="newUserRole" required>
                <option value="">--- Select the Rol ---</option>
                <option ng-repeat = "role in roles" ng-value="role.id_Rol">{{role.name}}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="role">Image:</label>
            <div class="col-sm-10">
              <img style="height:auto;max-width:150px;vertical-align:middle;width:100%;" ngf-src="imageUser"><br><hr>
              <button class="btn btn-info" ng-change="setAlbum()" ngf-select ng-model="imageUser" name="imageUser" ngf-pattern="'image/jpeg'"
              ngf-accept="'image/jpeg'" ngf-max-size="1MB" type="button" name="button">Album Image...</button><br>
              <span class="progress" ng-show="imageUser.progress >= 0">
                      <div style="width:{{imageUser.progress}}%">{{imageUser.progress}}%</div>
              </span>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button type="submit" class="btn btn-success" ng-disabled="uploadOK"  ng-click="addUser()">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>

 </div>
</div>
