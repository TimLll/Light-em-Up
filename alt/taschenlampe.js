$(document).ready(function () {

    showImage();

    function showImage() {
      var ctx = document.getElementById('canvas1').getContext('2d');
/*      canvas.addEventListener("mousemove", doSomething, false);*/
      var image = new Image();
      // adjust the image path
      image.src = 'yourImagePathHere';
      image.onload = function () {
        document.getElementById('canvas1').width = image.width;
        document.getElementById('canvas1').height = image.height;
        ctx.drawImage(image, 0, 0);

        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < imgData.data.length; i += 4) {
          // how to process?
          imgData.data[i] = imgData.data[i];
          imgData.data[i + 1] = imgData.data[i+1];
          imgData.data[i + 2] = imgData.data[i+2];
          imgData.data[i + 3] = imgData.data[i+3];
        }

        ctx.putImageData(imgData, 0, 0);
      };
    }
});
$(document).ready(function () {

    circupdate();
    
    function circUpdate() {
        context.beginPath();
        context.arc(100, 100, 50, 0, 2 * Math.PI, true);
        context.fillStyle = "#FF6A6A";
        context.fill();
    }
});
