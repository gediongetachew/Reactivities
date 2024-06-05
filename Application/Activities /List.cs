using Application.Activities.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Activity = Domain.Activity;

namespace Application.Activities
{
    public class List
    {
        public class Quary : IRequest<Result<List<Activity>>> {}

            public class Handler : IRequestHandler<Quary, Result<List<Activity>>>
            {
            private readonly DataContext _context;
            public Handler (DataContext context)
                {
              _context = context;
                    
                }
                
                public async Task<Result<List<Activity>>> Handle(Quary request, CancellationToken cancellationToken)
                {
                 
                    return Result<List<Activity>>.Success(await _context.Activities.ToListAsync(cancellationToken));
                }
            }
        
    }
}