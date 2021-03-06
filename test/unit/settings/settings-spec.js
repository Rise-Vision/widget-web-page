/* global describe, beforeEach, it, expect, module, inject */

/* eslint-disable func-names */

"use strict";

describe( "Web Page Settings", function() {

  var defaultSettings,
    $scope;

  beforeEach( module( "risevision.widget.web-page.settings" ) );

  beforeEach( function() {
    inject( function( $injector, $rootScope, $controller ) {
      defaultSettings = $injector.get( "defaultSettings" );
      $scope = $rootScope.$new();
      $controller( "webPageSettingsController", { $scope: $scope } );
    } );
  } );

  it( "should define defaultSettings", function() {
    expect( defaultSettings ).to.be.truely;
    expect( defaultSettings ).to.be.an( "object" );
  } );

  it( "should define webPageSettingsController", function() {
    expect( $scope.initialView ).to.be.truely;
  } );

  describe( "isPreviewUrl", function() {

    beforeEach( function() {
      $scope.settingsForm = {
        pageUrl: {
          $setValidity: function() {
            return;
          }
        }
      };
    } );

    it( "should set isPreviewUrl to true if the selected URL contains preview.risevision.com", function() {
      expect( $scope.isPreviewUrl ).to.be.false;

      $scope.settings = defaultSettings;
      $scope.settings.additionalParams.url = "http://preview.risevision.com/x";

      $scope.$digest();

      expect( $scope.isPreviewUrl ).to.be.true;
    } );

    it( "should set isPreviewUrl to false if the selected URL does not contain preview.risevision.com", function() {
      expect( $scope.isPreviewUrl ).to.be.false;

      $scope.settings = defaultSettings;
      $scope.settings.additionalParams.url = "http://postview.risevision.com/x";

      $scope.$digest();

      expect( $scope.isPreviewUrl ).to.be.false;
    } );
  } );

} );
