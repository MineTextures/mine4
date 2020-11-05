// Generated by CoffeeScript 2.5.1
var AssetLoader;

import * as THREE from './build/three.module.js';

import {
  FBXLoader
} from './jsm/loaders/FBXLoader.js';

AssetLoader = class AssetLoader {
  constructor(options) {
    this.assets = {};
  }

  load(assets, callback) {
    var _this, assetsLoaded, assetsNumber, fbxl, textureLoader;
    _this = this;
    textureLoader = new THREE.TextureLoader();
    fbxl = new FBXLoader();
    assetsNumber = 0;
    assetsLoaded = 0;
    Object.keys(assets).forEach(function(p) {
      return assetsNumber++;
    });
    Object.keys(assets).forEach(function(p) {
      var img, path, type;
      type = assets[p].type;
      path = assets[p].path;
      if (type === "texture") {
        textureLoader.load(path, function(texture) {
          _this.assets[p] = texture;
          assetsLoaded++;
          if (assetsLoaded === assetsNumber) {
            return callback();
          }
        });
      }
      if (type === "text") {
        $.get(path, function(data) {
          _this.assets[p] = data;
          assetsLoaded++;
          if (assetsLoaded === assetsNumber) {
            return callback();
          }
        });
      }
      if (type === "image") {
        img = new Image();
        img.onload = function() {
          _this.assets[p] = img;
          assetsLoaded++;
          if (assetsLoaded === assetsNumber) {
            return callback();
          }
        };
        img.src = path;
      }
      if (type === "fbx") {
        return fbxl.load(path, function(fbx) {
          _this.assets[p] = fbx;
          assetsLoaded++;
          if (assetsLoaded === assetsNumber) {
            return callback();
          }
        });
      }
    });
    return this;
  }

  get(assetName) {
    return this.assets[assetName];
  }

};

export {
  AssetLoader
};
