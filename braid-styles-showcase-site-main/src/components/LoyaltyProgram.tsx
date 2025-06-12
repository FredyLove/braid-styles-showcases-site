import { useState } from "react";

// Types
type Reward = {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
};

// Component
const LoyaltyProgram = () => {
  const [points, setPoints] = useState(150);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: "1",
      name: "10% Off Next Style",
      description: "Apply this discount on your next braiding appointment.",
      pointsRequired: 100,
    },
    {
      id: "2",
      name: "Free Deep Conditioning",
      description: "Receive a complimentary deep conditioning treatment.",
      pointsRequired: 150,
    },
    {
      id: "3",
      name: "Free Style Add-On",
      description: "Add beads, cuffs, or accessories for free.",
      pointsRequired: 200,
    },
    {
        id: "4",
        name: "Common Client Discount",
        description: "Reduce price, cuffs, or accessories for a lower price.",
        pointsRequired: 500,
      }
  ]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8">Loyalty Rewards</h2>

        {/* Points Card */}
        <div className="bg-gradient-to-r from-primary to-secondary p-1 rounded-xl mb-8">
          <div className="bg-white rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-primary mb-2">{points}</div>
              <p className="text-gray-600">points earned</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className="bg-primary h-4 rounded-full" 
                style={{ width: `${Math.min(100, (points / 200) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>0 points</span>
              <span>200 points for next reward</span>
            </div>
          </div>
        </div>

        {/* Rewards */}
        <h3 className="text-xl font-semibold mb-4">Available Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map(reward => (
            <div 
              key={reward.id}
              className={`border rounded-lg p-4 transition-all ${
                selectedReward === reward.id
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'border-gray-200 hover:border-primary'
              } ${
                points < reward.pointsRequired ? 'opacity-50' : 'cursor-pointer'
              }`}
              onClick={() => points >= reward.pointsRequired && setSelectedReward(reward.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{reward.name}</h4>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                  {reward.pointsRequired} pts
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{reward.description}</p>
              {points < reward.pointsRequired ? (
                <p className="text-red-500 text-sm">Need {reward.pointsRequired - points} more points</p>
              ) : (
                <button className="text-primary text-sm font-medium">
                  Redeem Reward
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoyaltyProgram;