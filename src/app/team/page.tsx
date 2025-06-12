import { mockUsers } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Team</h1>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Add Member
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={user.avatar || '/placeholder-avatar.png'}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end space-x-2">
                <button className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-md hover:bg-primary/20">
                  View Profile
                </button>
                <button className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-md hover:bg-primary/20">
                  Message
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 