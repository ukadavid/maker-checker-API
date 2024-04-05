import { PrismaClient, RequestStatus } from '@prisma/client';
import { CustomError } from '../exceptions';

const prisma = new PrismaClient();

export async function approveRequestService(requestId: string, approverId: string, status: string): Promise<any> {
  try {
 
    
    // Validate the provided status
    // if (status.toUpperCase() != RequestStatus.APPROVED.toString() || status.toUpperCase() != RequestStatus.DENIED.toString()) {
    //   throw new CustomError(400, 'Invalid status provided. Must be either "APPROVED" or "DENIED"');
    // }

    console.log("hiya");
    
    
    // Find the request by ID
    const request = await prisma.request.findFirst({
      where: {
        id: requestId,
      },
    });
    console.log("hiya1");
    // Check if the request exists
    if (!request) {
      throw new CustomError(404, 'Request not found');
    }

    if (request.status.toUpperCase() == "APPROVED") {
        throw new CustomError(400, 'Request has been approved already');
    }

    console.log("hiya2");
    // Check if the request has expired
    const today = new Date();
    console.log(today, request.expiration);
    
  
    if (request.expiration < today) {
      throw new CustomError(400, 'Sorry, request has expired');
    }

   
    console.log("hiya3");
    // Check if the requester is the same as the approver
    if (request.requesterId === approverId) {
      throw new CustomError(403, 'Requester cannot approve their own request');
    }
    console.log("hiya4");
    // Find the approver by ID
    const approver = await prisma.approver.findUnique({
      where: {
        id: approverId,
      },
    });
    console.log("hiya5");
    // Check if the approver exists
    if (!approver) {
      throw new CustomError(404, 'Approver not found');
    }
    console.log("hiya6");
    // Check if the approver is authorized to approve the request based on their approved request types
for (const approvedType of approver.approvedRequestTypes) {
    if (approvedType === "A") {
      if (request.requestType === "A" || request.requestType === "B" || request.requestType === "C") {
        throw new CustomError(403, 'Sorry, you cannot approve requests');
      }
    } else if (approvedType === "B") {
      if (request.requestType === "B" || request.requestType === "C") {
        throw new CustomError(403, 'Approver of type B cannot approve requests of type B or C');
      }
    } else if (approvedType === "C") {
      if (request.requestType === "C") {
        throw new CustomError(403, 'Approver of type C cannot approve requests of type C');
      }
    }
  }
  

    console.log("hiya7");
    // Update the request status based on the provided status
    let updatedRequest;
    switch (status.toUpperCase()) {
      case RequestStatus.APPROVED:
        updatedRequest = await prisma.request.update({
          where: { id: requestId },
          data: { status: RequestStatus.APPROVED },
        });
        break;
      case RequestStatus.DENIED:
        updatedRequest = await prisma.request.update({
          where: { id: requestId },
          data: { status: RequestStatus.DENIED },
        });
        break;
    }

    return updatedRequest;
  } catch (error) {
    // throw new CustomError((error as Error)., (error as Error).message || 'Failed to approve request');
    throw new CustomError(500, 'Failed to approve request');
  }
}
