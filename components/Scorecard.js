'use client';

   import { useState } from 'react';
   import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
   import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

   // Mock scorecard data for Lake of the Sandhills (simplified)
   const scorecardData = [
     { hole: 1, par: 4, yardage: 400, front: true },
     { hole: 2, par: 3, yardage: 180, front: true },
     { hole: 3, par: 4, yardage: 390, front: true },
     { hole: 4, par: 5, yardage: 510, front: true },
     { hole: 5, par: 4, yardage: 420, front: true },
     { hole: 6, par: 3, yardage: 170, front: true },
     { hole: 7, par: 4, yardage: 380, front: true },
     { hole: 8, par: 4, yardage: 410, front: true },
     { hole: 9, par: 5, yardage: 520, front: true },
     { hole: 10, par: 4, yardage: 410, front: false },
     { hole: 11, par: 3, yardage: 190, front: false },
     { hole: 12, par: 4, yardage: 400, front: false },
     { hole: 13, par: 5, yardage: 530, front: false },
     { hole: 14, par: 4, yardage: 390, front: false },
     { hole: 15, par: 3, yardage: 160, front: false },
     { hole: 16, par: 4, yardage: 420, front: false },
     { hole: 17, par: 4, yardage: 380, front: false },
     { hole: 18, par: 4, yardage: 390, front: false },
   ];

   export function Scorecard({ scores }) {
     const [view, setView] = useState('18');

     const filteredHoles = scorecardData.filter(hole => {
       if (view === '18') return true;
       if (view === 'front') return hole.front;
       if (view === 'back') return !hole.front;
       return true;
     });

     return (
       <div className="p-4">
         <Select onValueChange={setView} defaultValue="18">
           <SelectTrigger className="w-[180px] mb-4">
             <SelectValue placeholder="Select view" />
           </SelectTrigger>
           <SelectContent>
             <SelectItem value="18">18 Holes</SelectItem>
             <SelectItem value="front">Front 9</SelectItem>
             <SelectItem value="back">Back 9</SelectItem>
           </SelectContent>
         </Select>
         <Table>
           <TableHeader>
             <TableRow>
               <TableHead>Hole</TableHead>
               <TableHead>Par</TableHead>
               <TableHead>Yardage</TableHead>
               {scores && <TableHead>Score</TableHead>}
             </TableRow>
           </TableHeader>
           <TableBody>
             {filteredHoles.map(hole => (
               <TableRow key={hole.hole}>
                 <TableCell>{hole.hole}</TableCell>
                 <TableCell>{hole.par}</TableCell>
                 <TableCell>{hole.yardage}</TableCell>
                 {scores && <TableCell>{scores[hole.hole] || '-'}</TableCell>}
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </div>
     );
   }