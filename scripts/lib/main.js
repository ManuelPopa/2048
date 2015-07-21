var App = angular.module('app', [])

App.controller('GameCtrl', function ($scope, $rootScope) {
    var arrowHandler = null;
    var codes = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }


    $scope.gameState = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    window.render = function (state) {
        requestAnimationFrame(function () {
            for (var i = 0, ilen = state.length; i < ilen; i++) {
                var row = state[i];

                for (var j = 0, jlen = row.length; j < jlen; j++) {
                    cell = row[j];

                    $scope.gameState[i][j] = cell;
                }
            }

            $rootScope.$apply();
        });
    };

    window.addArrowHandler = function (handler) {
        arrowHandler = handler;
    }

    $scope.handlePress = function ($event) {
        if (!codes[$event.keyCode]) {
            return;
        }

        arrowHandler && arrowHandler(codes[$event.keyCode]);
    }

    startGame && startGame();
});

var colors = {
    0: 'none',
    2: 'two',
    4: 'four',
    8: 'eight',
    16: 'sixteen',
    32: 'thirtytwo',
    64: 'sixtyfour',
    128: 'onehundredtwentyeight',
    256: 'twohundredfiftysix',
    512: 'fivehundredtwelve'
};

App.directive('tile', function () {
    return {
        restrict: 'A',
        scope: {
            'value': '=value'
        },
        template: '<div class="tile color-{{color}}">{{parsedValue}}</div>',
        link: function ($scope, element) {
            $scope.$watch('value', function (newVal, oldVal) {
                setValue(newVal);
            });

            function setValue(value) {
                if (value > 0) {
                    $scope.parsedValue = value;
                } else {
                    $scope.parsedValue = '';
                }
                $scope.color = colors[value];
            }

            setValue($scope.value);
        }
    }
});

