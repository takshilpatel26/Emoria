@echo off
setlocal enabledelayedexpansion

set INPUT=D:\emoria\public\videos
set OUTPUT=D:\emoria\HLS

for %%F in ("%INPUT%\*.mp4") do (

    set NAME=%%~nF

    echo ====================================
    echo Processing !NAME!
    echo ====================================

    mkdir "%OUTPUT%\!NAME!\4k" 2>nul
    mkdir "%OUTPUT%\!NAME!\1080p" 2>nul

    echo Creating 4K HLS...

    ffmpeg -y ^
    -i "%%F" ^
    -c:v libx264 ^
    -preset slow ^
    -crf 18 ^
    -pix_fmt yuv420p ^
    -c:a aac ^
    -b:a 192k ^
    -f hls ^
    -hls_time 2 ^
    -hls_playlist_type vod ^
    -hls_flags independent_segments ^
    -hls_segment_filename "%OUTPUT%\!NAME!\4k\segment_%%03d.ts" ^
    "%OUTPUT%\!NAME!\4k\playlist.m3u8"

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
    -f hls ^
    -hls_time 2 ^
    -hls_playlist_type vod ^
    -hls_flags independent_segments ^
    -hls_segment_filename "%OUTPUT%\!NAME!\1080p\segment_%%03d.ts" ^
    "%OUTPUT%\!NAME!\1080p\playlist.m3u8"

    (
    echo #EXTM3U
    echo #EXT-X-VERSION:3
    echo #EXT-X-STREAM-INF:BANDWIDTH=50000000,RESOLUTION=3840x2160
    echo 4k/playlist.m3u8
    echo #EXT-X-STREAM-INF:BANDWIDTH=10000000,RESOLUTION=1920x1080
    echo 1080p/playlist.m3u8
    ) > "%OUTPUT%\!NAME!\master.m3u8"

)

echo.
echo ====================================
echo ALL VIDEOS CONVERTED
echo ====================================
pause