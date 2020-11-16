angular.module( "risevision.widget.web-page.settings" )
  .controller( "webPageSettingsController", [ "$scope", "$log", "responseHeaderAnalyzer",
    function( $scope, $log, responseHeaderAnalyzer ) {

      $scope.noFrameAncestors = true;
      $scope.noXFrameOptions = true;
      $scope.isPreviewUrl = false;
      $scope.isInsecureUrl = false;
      $scope.urlInput = false;

      function isInsecureUrl( url ) {
        return !!( url && url.startsWith( "http://" ) );
      }

      function processUrl() {
        $scope.isInsecureUrl = isInsecureUrl( $scope.settings.additionalParams.url );

        if ( !$scope.isInsecureUrl ) {
          $scope.validateXFrame();
        }
      }

      $scope.validateXFrame = function() {
        responseHeaderAnalyzer.getOptions( $scope.settings.additionalParams.url )
        .then( function( options ) {
          $scope.noFrameAncestors = !options.includes( "frame-ancestors" );
          $scope.noXFrameOptions = !options.includes( "X-Frame-Options" );
        } );
      };

      $scope.$on( "urlFieldBlur", function() {
        if ( $scope.settingsForm.pageUrl.$valid ) {
          processUrl();
        }
      } );

      $scope.$watch( "urlInput", function( value ) {
        if ( typeof value !== "undefined" ) {
          $scope.settingsForm.pageUrl.$setValidity( "urlInput", value );
        }
      } );

      $scope.$watch( "isInsecureUrl", function( value ) {
        if ( typeof value !== "undefined" ) {
          $scope.settingsForm.pageUrl.$setValidity( "isInsecureUrl", !value );
        }
      } );

      $scope.$watch( "settings.additionalParams.url", function( newVal, oldVal ) {
        $scope.isPreviewUrl = newVal && newVal.indexOf( "preview.risevision.com" ) > 0;

        if ( typeof oldVal === "undefined" && newVal && newVal !== "" ) {
          $scope.urlInput = true;

          // previously saved settings are being shown, ensure to check if page has X-Frame-Options
          processUrl();
        } else {
          if ( typeof newVal !== "undefined" ) {
            // ensure warning messages don't get shown while url field is receiving input
            $scope.noFrameAncestors = true;
            $scope.noXFrameOptions = true;
            $scope.isInsecureUrl = false;

            if ( newVal !== "" ) {
              $scope.urlInput = true;
            }
          }
        }
      } );

      $scope.$watch( "settings.additionalParams.zoom", function( value ) {
        if ( typeof value !== "undefined" ) {
          if ( value > 1 ) {
            $scope.settings.additionalParams.interactivity.scrollbars = false;
          }
        }
      } );

      $scope.$watch( "settings.additionalParams.interactivity.interactive", function( value ) {
        if ( typeof value !== "undefined" ) {
          if ( !value ) {
            $scope.settings.additionalParams.interactivity.scrollbars = false;
          }
        }
      } );

    } ] )
  .value( "defaultSettings", {
    params: {},
    additionalParams: {
      cacheBuster: true,
      interactivity: {
        interactive: false,
        scrollbars: false
      },
      refresh: 0,
      region: {
        showRegion: "page",
        horizontal: 0,
        vertical: 0
      },
      unload: true,
      url: "",
      zoom: 1
    }
  } );
