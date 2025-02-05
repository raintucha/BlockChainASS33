// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract AITUSE2316 is ERC20 {
    using Strings for uint256;

    // Структура для хранения данных последней транзакции
    struct TransactionDetails {
        uint256 timestamp;
        address sender;
        address receiver;
        uint256 amount;
    }
    
    TransactionDetails private lastTransaction;
    address public owner;

    // Конструктор принимает начальный запас токенов (например, 2000 токенов с 18 знаками)
    // Значение initialSupply передаётся уже масштабированным (например, 2000 * 10^18)
    constructor(uint256 initialSupply) ERC20("University_Group_Token", "UGT") {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }

    // Переопределяем публичную функцию transfer, чтобы обновлять данные последней транзакции
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        bool success = super.transfer(recipient, amount);
        if (success) {
            lastTransaction = TransactionDetails({
                timestamp: block.timestamp,
                sender: msg.sender,
                receiver: recipient,
                amount: amount
            });
        }
        return success;
    }

    // Переопределяем публичную функцию transferFrom, чтобы обновлять данные последней транзакции
    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        bool success = super.transferFrom(sender, recipient, amount);
        if (success) {
            lastTransaction = TransactionDetails({
                timestamp: block.timestamp,
                sender: sender,
                receiver: recipient,
                amount: amount
            });
        }
        return success;
    }

    // Новая функция для получения timestamp последней транзакции для указанного адреса
    function getLatestTransactionTimestamp(address account) public view returns (uint256) {
        // Если указанный адрес участвует в последней транзакции (как отправитель или получатель),
        // возвращаем timestamp, иначе — возвращаем 0.
        if (lastTransaction.sender == account || lastTransaction.receiver == account) {
            return lastTransaction.timestamp;
        }
        return 0;
    }

    // Функция для получения timestamp в виде строки (человекочитаемый формат)
    function getLatestTransactionTimestampHuman(address account) public view returns (string memory) {
        uint256 ts = getLatestTransactionTimestamp(account);
        return ts.toString();
    }

    // Функция для получения адреса отправителя последней транзакции
    function getLatestTransactionSender() public view returns (address) {
        return lastTransaction.sender;
    }

    // Функция для получения адреса получателя последней транзакции
    function getLatestTransactionReceiver() public view returns (address) {
        return lastTransaction.receiver;
    }
}
