require.config({
    baseUrl: '../',
    paths: {
    //Application paths
        managerModule: 'js/app/modules/managerModule',
            basic: 'js/app/basic',
            angular: 'js/angular.min',
            sweetAlert: 'components/sweetalert-master/sweetalert-master/dist/sweetalert.min',
        loginController: 'js/app/controllers/loginController',
        headerController: 'js/app/controllers/headerController',
        userController: 'js/app/controllers/userController',
        newAudioController :'js/app/controllers/newAudioController',
        audioController :'js/app/controllers/audioController',
        modifyUserController : 'js/app/controllers/modifyUserController',
        jquery: 'components/jQuery/jquery-2.2.3.min',
        bootstrap: 'components/bootstrap/dist/js/bootstrap.min',
        dashboard: 'js/dashboard',
        dataragepicker: 'components/daterangepicker/daterangepicker',
        moment: 'js/moment.min',
        datapicker:'components/datepicker/bootstrap-datepicker',
        wysihtml5: 'components/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min',
        fastclick: 'components/fastclick/fastclick',
        demo: 'js/demo',
        app:'js/app',
        jqueryui: 'components/jquery-ui/jquery-ui.min',
        particles: 'lib/Particles',
        functions: 'js/app/factories/functions',
        ngFileUpload : 'components/ng-file-upload/dist/ng-file-upload-all'
    },
    shim: {
    //Application dependencies
      'app':{
        deps:['jquery','jqueryui','bootstrap'],
        exports: 'app'
      },
      'customtheme':{
        deps:['jquery','metis'],
        exports: 'customtheme'
      },
      'datapicker':{
        deps:['moment'],
        exports:'datapicker'
      },
      'moment':{
        deps:['dataragepicker'],
        exports:'moment'
      },
      'jqueryui':{
        deps:['jquery'],
        exports:'jqueryui'
      },
      'demo':{
        deps:['dashboard'],
        exports: 'demo'
      },

      //BOT deps
      //MORRIS NADA
        managerModule: ['angular','sweetAlert','bootstrap','particles','app','dashboard','demo','functions','ngFileUpload']

    }
});
