<div class="col-md-12">
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active" aria-hidden="true"><a href="#musicTable" aria-controls="musicTable" role="tab" data-toggle="tab">Music Table & Player&nbsp;&nbsp;
      <span class="fa-stack">
        <i class="fa fa-square-o fa-stack-2x"></i>
        <i class="fa fa-headphones fa-stack-1x"></i>
      </span>
    </a></li>
  </ul>


<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Update Song Info</h4>
      </div>
      <div class="modal-body">
        <form class="form-inline">
          <h3>Edit Song Name</h3>
          <div class="form-group">
            <input type="text" class="form-control" id="songName" ng-model="updateSongName" ng-change="checkSongname()">
          </div>
          <button class="btn btn-success" ng-disabled="validSongName" ng-click="updateSongNameCall()">Save</button>
        </form>

        <form class="form-inline">
          <h3>Edit Album Name</h3>
          <div class="form-group">
            <input type="text" class="form-control" id="albumName" ng-model="updateAlbumName" ng-change="checkSongAlbum()">
          </div>
          <button class="btn btn-success" ng-disabled="validAlbumName" ng-click="updateSongAlbum()">Save</button>
        </form>

        <form class="form-inline">
          <h3>Edit Year</h3>
          <div class="form-group">
            <input type="text" class="form-control" id="year" ng-model="updateYear" maxlength="4" ng-change="checkYear()">
          </div>
          <button class="btn btn-success" ng-disabled="validYear" ng-click="updateNewYear()">Save</button>
        </form>

        <form class="form-inline">
          <h3>Edit Artist</h3>
          <div class="form-group">
            <input type="text" class="form-control" id="artist" ng-model="updateArtist" ng-change="checkYear()">
          </div>
          <button class="btn btn-success" ng-disabled="validArtist" ng-click="updateNewArtist()">Save</button>
        </form>

        <form class="form-inline">
          <h3>Edit Genre</h3>
          <div class="form-group">
            <input type="text" class="form-control" id="genre" ng-model="updateGenre" ng-change="checkGenre()">
          </div>
          <button class="btn btn-success" ng-disabled="validGenre" ng-click="updateNewGenre()">Save</button>
        </form>

        <form class="form-inline">
          <h3>Edit Length</h3>
          <div class="form-group">
            <input type="text" class="form-control" id="length" ng-model="updateLength" maxlength="6" ng-change="checkLength()">
          </div>
          <button class="btn btn-success" ng-disabled="validLength" ng-click="updateNewLength()">Save</button>
        </form>

        <form class="form-inline">
          <h3>Album Image - New</h3>
          <div class="form-group">
            <img style="height:auto;max-width:150px;vertical-align:middle;width:100%;" ngf-src="imageAlbum">
            <button class="btn btn-info" ng-change="setAlbum()" ngf-select ng-model="imageAlbum" name="imageAlbum" ngf-pattern="'image/jpeg'"
            ngf-accept="'image/jpeg'" ngf-max-size="1MB" type="button" name="button">Album Image...</button><br>
            <span class="progress" ng-show="imageAlbum.progress >= 0">
                    <div style="width:{{imageAlbum.progress}}%">{{imageAlbum.progress}}%</div>
            </span>
          </div>
        </form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


  <div class="tab-content">

    <div role="tabpanel" class="tab-pane active" id="musicTable">
      <div class="col-md-12">
        <br><br><br>
          <table datatable="" dt-options="vm.dtOptions" dt-columns="vm.dtColumns" class="table table-striped table-bordered" dt-instance="vm.dtInstance"></table>
      </div>
    </div>

 </div>
</div>
