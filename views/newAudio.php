<div class="col-md-12">
        <br><br><br>
        <div align="center">
              Preview: <br><hr><img style="height:auto;max-width:150px;vertical-align:middle;width:100%;" ngf-src="image"><br><hr><audio controls ngf-src="audio"></audio>
        </div><br><br>
        <form class="form-horizontal" name="uploadAudioForm">
          <div class="form-group">
            <label class="control-label col-sm-2" for="trackname">Track Name:</label>
            <div class="col-sm-5">
              <input type="text" name="trackname" class="form-control" id="trackname" placeholder="Enter Song Name" ng-model="newAudio.name" required>
            </div>
            <div class="col-sm-3">
                    <button class="btn btn-info" ng-change="setAudio()" ngf-select ng-model="audio" name="audio" ngf-pattern="'audio/mp3'"
                    ngf-accept="'audio/mp3'" ngf-max-size="10MB" type="button" name="button">Track...</button><br>
                    <span class="progress" ng-show="audio.progress >= 0">
                            <div style="width:{{audio.progress}}%">{{audio.progress}}%</div>
                    </span>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="album">Album:</label>
            <div class="col-sm-5">
              <input type="text" name="album" class="form-control" id="album" placeholder="Enter Album Name" ng-model="newAudio.album" required>
            </div>
            <div class="col-md-3">
                    <button class="btn btn-info" ng-change="setAlbum()" ngf-select ng-model="image" name="image" ngf-pattern="'image/jpeg'"
                    ngf-accept="'image/jpeg'" ngf-max-size="1MB" type="button" name="button">Album Image...</button><br>
                    <span class="progress" ng-show="image.progress >= 0">
                            <div style="width:{{image.progress}}%">{{image.progress}}%</div>
                    </span>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="year">Year:</label>
            <div class="col-sm-10">
              <input type="text" name="year" class="form-control" id="year" placeholder="Enter Album Year" ng-model="newAudio.year" required>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="artist">Artist:</label>
            <div class="col-sm-10">
              <input type="text" name="artist" class="form-control" id="artist" placeholder="Enter Artist" ng-model="newAudio.artirst" required>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="genre">Genre:</label>
            <div class="col-sm-10">
              <input type="text" name="genre" class="form-control" id="genre" placeholder="Enter Genre" ng-model="newAudio.genre" required>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="duration">Song Duration:</label>
            <div class="col-sm-10">
              <input type="text" name="duration" class="form-control" id="duration" placeholder="Enter Genre" ng-model="newAudio.duration" required>
            </div>
          </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button type="submit" class="btn btn-success" ng-disabled="uploadAudioForm.$invalid &&  uploadOK" ng-click="addAudio()">Submit</button>
            </div>
          </div>
        </form>
</div>
