@echo off
setlocal EnableDelayedExpansion

:: ==========================
:: Source and Output folders
:: ==========================
set INPUT=D:\emoria\public\videos
set OUTPUT=D:\emoria\HLS

echo.
echo =====================================
echo Starting HLS conversion...
echo =====================================
echo.

for %%F in ("%INPUT%\*.m4v" "%INPUT%\*.M4V") do (

    set NAME=%%~nF

    echo.
    echo =====================================
    echo Processing: !NAME!
    echo =====================================

    mkdir "%OUTPUT%\!NAME!" 2>nul
    mkdir "%OUTPUT%\!NAME!\4k" 2>nul
    mkdir "%OUTPUT%\!NAME!\1080p" 2>nul

    echo.
    echo Creating 4K HLS...

    ffmpeg -y ^
    -i "%%F" ^
    -c:v libx264 ^
    -preset slow ^
    -crf 18 ^
    -pix_fmt yuv420p ^
    -c:a aac ^
    -b:a 192k ^
    -ar 48000 ^
    -ac 2 ^
    -f hls ^
    -hls_time 6 ^
    -hls_playlist_type vod ^
    -hls_flags independent_segments ^
    -hls_segment_filename "%OUTPUT%\!NAME!\4k\segment_%%03d.ts" ^
    "%OUTPUT%\!NAME!\4k\playlist.m3u8"

    echo.
    echo Creating 1080p HLS...

    ffmpeg -y ^
    -i "%%F" ^
    -vf scale=-2:1080 ^
    -c:v libx264 ^
    -preset slow ^
    -crf 20 ^
    -pix_fmt yuv420p ^
    -c:a aac ^
    -b:a 192k ^
    -ar 48000 ^
    -ac 2 ^
    -f hls ^
    -hls_time 6 ^
    -hls_playlist_type vod ^
    -hls_flags independent_segments ^
    -hls_segment_filename "%OUTPUT%\!NAME!\1080p\segment_%%03d.ts" ^
    "%OUTPUT%\!NAME!\1080p\playlist.m3u8"

    (
        echo #EXTM3U
        echo #EXT-X-VERSION:3
        echo.
        echo #EXT-X-STREAM-INF:BANDWIDTH=30000000,RESOLUTION=3840x2160
        echo 4k/playlist.m3u8
        echo.
        echo #EXT-X-STREAM-INF:BANDWIDTH=7000000,RESOLUTION=1920x1080
        echo 1080p/playlist.m3u8
    ) > "%OUTPUT%\!NAME!\master.m3u8"

    echo.
    echo Finished !NAME!
    echo.

)

echo.
echo =====================================
echo ALL VIDEOS COMPLETED
echo =====================================

pause