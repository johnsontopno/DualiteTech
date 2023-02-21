$(function () {
    $(".sidebar-link").click(function () {
     $(".sidebar-link").removeClass("is-active");
     $(this).addClass("is-active");
    });
   });
   
   $(window)
    .resize(function () {
     if ($(window).width() > 1090) {
      $(".sidebar").removeClass("collapse");
     } else {
      $(".sidebar").addClass("collapse");
     }
    })
    .resize();
   
   const allVideos = document.querySelectorAll(".video");
   
   allVideos.forEach((v) => {
    v.addEventListener("mouseover", () => {
     const video = v.querySelector("video");
     video.play();
    });
    v.addEventListener("mouseleave", () => {
     const video = v.querySelector("video");
     video.pause();
    });
   });
   
   $(function () {
    $(".logo, .logo-expand, .discover").on("click", function (e) {
     $(".main-container").removeClass("show");
     $(".main-container").scrollTop(0);
    });
    $(".trending, .video").on("click", function (e) {
     $(".main-container").addClass("show");
     $(".main-container").scrollTop(0);
     $(".sidebar-link").removeClass("is-active");
     $(".trending").addClass("is-active");
    });
   
    $(".video").click(function () {
     var source = $(this).find("source").attr("src");
     var title = $(this).find(".video-name").text();
     var person = $(this).find(".video-by").text();
     var img = $(this).find(".author-img").attr("src");
     $(".video-stream video").stop();
     $(".video-stream source").attr("src", source);
     $(".video-stream video").load();
     $(".video-p-title").text(title);
     $(".video-p-name").text(person);
     $(".video-detail .author-img").attr("src", img);
    });
   });
   



   //jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function () {
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  next_fs = $(this).parent().next();

  //activate next step on progressbar using the index of next_fs
  $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

  //show the next fieldset
  next_fs.show();
  //hide the current fieldset with style
  current_fs.animate(
    { opacity: 0 },
    {
      step: function (now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale current_fs down to 80%
        scale = 1 - (1 - now) * 0.2;
        //2. bring next_fs from the right(50%)
        left = now * 50 + "%";
        //3. increase opacity of next_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({
          transform: "scale(" + scale + ")",
          position: "absolute"
        });
        next_fs.css({ left: left, opacity: opacity });
      },
      duration: 800,
      complete: function () {
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: "easeInOutBack"
    }
  );
});

$(".previous").click(function () {
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();

  //de-activate current step on progressbar
  $("#progressbar li")
    .eq($("fieldset").index(current_fs))
    .removeClass("active");

  //show the previous fieldset
  previous_fs.show();
  //hide the current fieldset with style
  current_fs.animate(
    { opacity: 0 },
    {
      step: function (now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale previous_fs from 80% to 100%
        scale = 0.8 + (1 - now) * 0.2;
        //2. take current_fs to the right(50%) - from 0%
        left = (1 - now) * 50 + "%";
        //3. increase opacity of previous_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({ left: left });
        previous_fs.css({
          transform: "scale(" + scale + ")",
          opacity: opacity
        });
      },
      duration: 800,
      complete: function () {
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: "easeInOutBack"
    }
  );
});

   
   
   
   