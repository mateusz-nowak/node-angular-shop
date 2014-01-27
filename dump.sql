-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Czas wygenerowania: 27 Sty 2014, 20:59
-- Wersja serwera: 5.5.25
-- Wersja PHP: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Baza danych: `dev_node`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `categories`
--

CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Zrzut danych tabeli `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Akcesoria (Laptop, PC)'),
(2, 'Części do laptopów');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `price` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Zrzut danych tabeli `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `category_id`, `description`) VALUES
(1, 'Macbook Pro', 1500000, 1, 'MacBook Pro – linia profesjonalnych laptopów w produkcji Apple Inc. Jest ona następczynią modeli z serii PowerBook G4 i jest jednocześnie pierwszym komputerem przenośnym Macintosh, który używa intelowskiego 64-bitowego dwu oraz czterordzeniowego procesora Intel Core i5 oraz i7. Obecnie bazuje na 64 bitowych procesorach intela z platformy Ivy Bridge.');

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

