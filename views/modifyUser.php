<div class="col-md-12">
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active" aria-hidden="true"><a href="#myProfile" aria-controls="myProfile" role="tab" data-toggle="tab">My Profile&nbsp;&nbsp;
      <span class="fa-stack">
        <i class="fa fa-square-o fa-stack-2x"></i>
        <i class="fa fa-user fa-stack-1x"></i>
      </span>
    </a></li>
  </ul>


  <div class="tab-content">

    <div role="tabpanel" class="tab-pane active" id="myProfile">
      <div class="col-md-12">
        <br><br><br>


          <div class="form-group col-md-12">
            <label class="control-label col-sm-2" for="userName">Name:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="userName" ng-change="checkUserNameFun()" placeholder="Enter Name" ng-model="newUserName" required>
            </div>
            <div class="col-sm-2">
              <button type="submit" class="btn btn-success" ng-disabled="checkUserName"  ng-click="saveNewName()">Save</button>
            </div>
          </div>

          <div class="form-group col-md-12">
            <label class="control-label col-sm-2" for="userLastname">Lastname:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="userLastname" ng-change="checkUserLastNameFun()" placeholder="Enter Lastname" ng-model="newUserLastName" required>
            </div>
            <div class="col-sm-2">
              <button type="submit" class="btn btn-success" ng-disabled="checkUserLastName"  ng-click="saveNewLastName()">Save</button>
            </div>
          </div>

          <div class="form-group col-md-12">
            <label class="control-label col-sm-2" for="pwd">Password:</label>
            <div class="col-sm-8">
              <input type="password" class="form-control" id="pwd" ng-change = "checkUserPassFun()" placeholder="Enter password" ng-model="newUserPass" required>
              <input type="password" class="form-control" id="pwd" ng-change = "checkUserPass1Fun()" ng-show="checkCurrentPass" placeholder="Enter password New Password" ng-model="newUserPass1" required>
              <input type="password" class="form-control" id="pwd" ng-change = "checkUserPass2Fun()" ng-show="checkCurrentPass" placeholder="Enter password Re - Enter Password" ng-model="newUserPass2" required>
            </div>
            <div class="col-sm-2">
              <button type="submit" class="btn btn-success" ng-disabled="checkPass2"  ng-click="saveNewPass()">Save</button>
            </div>
          </div>

          <div class="form-group col-md-12">
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

      </div>
    </div>
 </div>
</div>
