---
title: Ubuntu Installation Guide
date: 2023-01-03 00:00:00
categories:
  - Career
tags:
  - Ubuntu
  - Linux
  - Dual Boot
  - OS
---

This post is aimed to help people dual boot Windows 10 and Ubuntu on their PC.

It is worth mentioning that this installation guide is very case-dependent and you might need an alternative way in some specific steps. In my case, I was trying to install Ubuntu on my Surface Book 2, where I originally had Windows 10 Pro installed as the default OS. However, I found no single tutorial that 100% worked for me, and what I had to do was mix-and-matching the steps from a few different tutorials. When none of their solutions works, you may have to figure things out on your own. The main resources I used were the tutorials provided by [SavvyNik](https://youtu.be/GXxTxBPKecQ), [Octillionth Tech](https://youtu.be/Kc4jUDu5_tk), and [桩桩计算](https://www.bilibili.com/video/BV11k4y1k7Li/).

In general, you would want to follow these steps in order when installing Ubuntu on your Windows machine:

1. Partitioning the Disk: Have a partition on the disk larger than 30GB for the new OS.
2. Flashing the USB: Flash the Ubuntu image file (.iso) into a USB stick.
3. Entering the Boot Menu: Go to the machine's boot menu and select Ubuntu for further installation.

For each of these steps, the solution I used will be prioritized over the alternative solutions if there are any.

1. Partitioning the Disk
   Normally a laptop has only one disk which will be your Local Disk (C:). Search for "Create and format hard disk partitions" control panel on your Windows 10, where you will be able to right click the "Local Disk (C:)" to select "Shrink Volumn" to make more space available for a new partition that is as least 30GB.
   However, this approach didn't work for my laptop. Although there was over 90GB of free space on my C drive, I was only able to shrink around 250MB using the "Shrink Volumn" feature. Therefore, to obtain sufficient space, I ended up using the "AOMEI Partition Assistant" app and it took a few hours to complete the shrinking. I also used this app to create the new partition.

2. Flashing the USB
   Once you download the ISO file for the Ubuntu version you'd like to use, you then need to flash this image file to a USB. Note that this operation will wipe out all data in the USB! Many tutorials used an app named "balenaEtcher", but this software somehow didn't work for me either. I tried a few times, and it kept partitioning my USB in a way that the USB wasn't recognized by the OS. To recover from such states, I had to use the AOMEI app again to combine those partitions in the USB to make it usable.
   The alternative app I used was "rufus", which burned the ISO into my USB without making new partitions.

3. Entering the Boot Menu
   Boot menus are loaded when computers are booted, where you get to choose the OS you'd like to continue with. However, your laptop will most likely not allow you to use systems other than Windows 10, and to disable this restriction, you need to go to the BIOS of your machine and disable the "Secure Boot" option. Note that how to the BIOS depends on the motherboard or laptop model of your machine. To exit the BIOS, you will have to restart your computer.
   I was using Surface Book 2, so how I enter the boot menu is pressing the volume-up button and power button the same time. The boot menu will be loaded shortly after you see an unlock icon on a red bar at the top of your screen, where you get to select between "Ubuntu" and "Windows Boot Manager". Select "Ubuntu" there to finish setting up Ubuntu.

Congratulations on being able to use Ubuntu on your machine!
