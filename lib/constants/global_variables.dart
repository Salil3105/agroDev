import 'package:flutter/material.dart';

const uri = "http://10.0.2.2:5000";

class GlobalVariables {
  // Colors
  static const appBarGradient = LinearGradient(
    colors: [
      // Color.fromARGB(225, 27, 206, 63),
      // Color.fromARGB(172, 55, 200, 94),
      Color.fromARGB(255, 89, 204, 36),
      Color.fromARGB(245, 59, 180, 69),
    ],
    stops: [0.5, 1.0],
  );

  static const secondaryColor = Color.fromRGBO(255, 153, 0, 1);
  static const backgroundColor = Colors.white;
  static const Color greyBackgroundCOlor = Color(0xffebecee);
  // static var selectedNavBarColor = Colors.cyan[800]!;
  static var selectedNavBarColor = const Color.fromARGB(255, 89, 204, 36);
  static const unselectedNavBarColor = Colors.black87;

  // STATIC IMAGES
  static const List<String> carouselImages = [
    'https://www.newsclick.in/sites/default/files/2021-08/Pradhan%20Mantri%20Fasal%20Bima%20Yojana.jpeg',
    'https://www.vachamarathi.com/wp-content/uploads/2022/12/shinde.jpeg',
    'https://pbs.twimg.com/media/EhplBxvWsAE6yPO.jpg',
    'https://miro.medium.com/v2/resize:fit:1024/1*e2STKLnd4X65njRzjCdBbA.png',
  ];

  static const List<Map<String, String>> categoryImages = [
    {
      'title': 'Instruments',
      'image': 'assets/images/mobiles.jpeg',
    },
    {
      'title': 'Essentials',
      'image': 'assets/images/essentials.jpeg',
    },
    {
      'title': 'Appliances',
      'image': 'assets/images/appliances.jpeg',
    },
    {
      'title': 'Articles',
      'image': 'assets/images/books.jpeg',
    },
    {
      'title': 'Cloths',
      'image': 'assets/images/fashion.jpeg',
    },
  ];
}
