'use client'

import { useEffect, useState } from 'react';
import PasserList from './components/Passer';
import { getRecruitmentList } from '@/app/api/resumeAPI';

export default function PasserPage() {
  const [recruitmentId, setRecruitmentId] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecruitment = async () => {
      try {
        setLoading(true);
        const data = await getRecruitmentList();
        console.log('Recruitment List:', data);
        
        if (data && data.length > 0) {
          setRecruitmentId(data[0].id);
        } else {
          setError('No recruitment data available');
        }
      } catch (error) {
        console.error('Error fetching recruitment:', error);
        setError('Failed to fetch recruitment data');
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitment();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recruitmentId) return <div>No recruitment found</div>;

  return <PasserList recruitmentId={recruitmentId} />;
}