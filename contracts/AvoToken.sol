pragma solidity ^0.6.2;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AvoToken is ERC20 {
    constructor(uint256 _initialSupply) public ERC20("AvoToken", "AVO") {
        _mint(msg.sender, _initialSupply);
        _setupDecimals(0); // avotokens can only be transferred as whole
        _owner = msg.sender;
    }

    struct Allowance {
        bool exists;
        uint256 allowedAmount;
    }

    mapping(address => Allowance) public allowances;
    address[] public allowancesList;

    event AllowanceCreated(address allowanceAddress);
    event AllowanceUpdated(address allowanceAddress);

    function exists(address allowanceAddress)
        public
        view
        returns (bool doesExist)
    {
        return allowances[allowanceAddress].exists;
    }

    function getAllowancesCount() public view returns (uint256 addressCount) {
        return allowancesList.length;
    }

    function getAllowanceAmount(address allowanceAddress)
        public
        view
        returns (uint256 allowanceAmount)
    {
        if (!exists(allowanceAddress)) revert();
        return allowances[allowanceAddress].allowedAmount;
    }

    function newAllowance(address allowanceAddress) internal {
        if (exists(allowanceAddress)) revert();
        allowances[allowanceAddress].exists = true;
        allowancesList.push(allowanceAddress);
        emit AllowanceCreated(allowanceAddress);
    }

    function updateAllowance(address allowanceAddress, int256 _changeAllowance)
        internal
    {
        if (!exists(allowanceAddress)) revert();
        int256 currentAmount = int256(
            allowances[allowanceAddress].allowedAmount
        );
        allowances[allowanceAddress].allowedAmount = uint256(
            currentAmount + _changeAllowance
        );
        emit AllowanceUpdated(allowanceAddress);
    }

    function createOrUpdateAllowance(
        address allowanceAddress,
        int256 _changeAllowance
    ) internal {
        if (!exists(allowanceAddress)) newAllowance(allowanceAddress);
        updateAllowance(allowanceAddress, _changeAllowance);
    }

    function requestAllowance(address allowanceAddress) public {
        if (!exists(allowanceAddress)) newAllowance(allowanceAddress);
    }

    // In reality these events are not needed as the same information is included
    // in the default ERC20 Transfer event, but they serve as demonstrators
    event AVOBuyEvent(address from, address to, uint256 amount);

    event AVOSellEvent(address from, address to, uint256 amount);

    event AllowanceIncrease(address spender, uint256 addedValue);

    event AllowanceDecrease(address spender, uint256 subtractedValue);

    address private _owner;
    mapping(address => uint256) pendingWithdrawals;

    // Initialises smart contract with supply of tokens going to the address that
    // deployed the contract.
    function verifyOwner() public view onlyOwner returns (bool) {
        return true;
    }

    function incAllowance(address _spender, uint256 _addedValue)
        public
        onlyOwner
    {
        bool works = increaseAllowance(_spender, _addedValue);
        if (works) {
            emit AllowanceIncrease(_spender, _addedValue);
            createOrUpdateAllowance(_spender, int256(_addedValue));
        }
    }

    function decAllowance(address _spender, uint256 _subtractedValue)
        public
        onlyOwner
    {
        bool works = decreaseAllowance(_spender, _subtractedValue);
        if (works) {
            emit AllowanceDecrease(_spender, _subtractedValue);
            int256 value = 0 - int256(_subtractedValue);
            createOrUpdateAllowance(_spender, value);
        }
    }

    // A wallet sends Eth and receives AVO in return
    function buyToken(uint256 _amount) external payable {
        // Ensures that correct amount of Eth sent for AVO
        // 1 ETH is set equal to 1 AVO
        require(_amount == ((msg.value / 1 ether)), "Incorrect amount of Eth.");
        transferFrom(_owner, msg.sender, _amount);
        emit AVOBuyEvent(_owner, msg.sender, _amount);
    }

    // A wallet sends AVO and receives Eth in return
    function sellToken(uint256 _amount) public {
        pendingWithdrawals[msg.sender] = _amount;
        transfer(_owner, _amount);
        withdrawEth();
        emit AVOSellEvent(msg.sender, _owner, _amount);
    }

    // Using the Withdraw Pattern to remove Eth from contract account when user
    // wants to return AVO
    // https://solidity.readthedocs.io/en/latest/common-patterns.html#withdrawal-from-contracts
    function withdrawEth() public {
        uint256 amount = pendingWithdrawals[msg.sender];
        // Pending refund zerod before to prevent re-entrancy attacks
        pendingWithdrawals[msg.sender] = 0;
        msg.sender.transfer(amount * 1 ether);
    }

    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the _owner");
        _;
    }
}
